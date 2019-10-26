import { ExpressController } from '../utils/ExpressDecorators'
import { ResultsHelper } from "../utils/ResultsHelper";
import { getConnection } from "typeorm";
import * as jwt from 'jsonwebtoken';
import { RESTApi } from "../RestAPI";
import * as bcrypt from "bcrypt";
import { Users, Accounts, Stores, Sections, Brands, Types, Tags } from '../db/models';
import { UserView } from '../db/viewModels';


@ExpressController.basePath('/auth')
export default class AuthController {

    defaults = {
        stores: [
            {
                name: "Trader Joe's",
            },
            {
                name: "Kroger",
            },
            {
                name: "Wal-Mart",
            },
            {
                name: "Whole Foods Market",
            },
            {
                name: "7-Eleven",
            }
        ],
        sections: [
            {
                name: "Produce",
            },
            {
                name: "Bakery",
            },
            {
                name: "Frozen",
            },
            {
                name: "Meat/Seafood",
            },
            {
                name: "Deli",
            },
            {
                name: "Personal/Health",
            },
            {
                name: "Pet",
            },
            {
                name: "Pantry",
            },
            {
                name: "Dairy",
            },
            {
                name: "Household Supplies",
            },
            {
                name: "Other",
            }
        ],
        types: [
            {
                name: "Vegetables",
            },
            {
                name: "Counter (Not Pre-Packaged)",
            },
            {
                name: "Beverage",
            },
            {
                name: "Pets",
            },
            {
                name: "Dairy",
            },
            {
                name: "Canned",
            },
            {
                name: "Chips/Snacks",
            },
            {
                name: "Fruits",
            },
            {
                name: "Seafood",
            },
            {
                name: "Toiletries",
            },
            {
                name: "Condiments",
            },
            {
                name: "Spices",
            },
            {
                name: "Baking",
            },
            {
                name: "Other",
            },
            {
                name: "Soups/Broth",
            },
            {
                name: "Bread",
            },
            {
                name: "Deserts",
            },
            {
                name: "Food Storage",
            },
            {
                name: "Cleaners",
            }
        ],
        brands: [
            {
                name: "Coca-Cola",
            },
            {
                name: "Quaker",
            },
            {
                name: "Dannon",
            },
            {
                name: "Aunt Millie's",
            },
            {
                name: "Hershey's",
            }
        ],
        tags:[
            {
                name: "Breakfast",
            },
            {
                name: "Lunch",
            },
            {
                name: "Dinner",
            },
            {
                name: "Snack",
            },
            {
                name: "Meal Prep",
            },
            {
                name: "Alcohol",
            },
            {
                name: "Guests",
            },
            {
                name: "(meal name)",
            }
        ],
    }
    @ExpressController.post('/login', [])
    async loginUser(req, res) {
        try {
            let user = await getConnection().getRepository(Users).findOne({
                where: {
                    userName: (<string>req.body.userName).toLowerCase()
                },
                relations: ['account']
            });
            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                return ResultsHelper.sendResult(res, { message: 'Invalid Username or Password' }, 401);
            }
            //We're all good on the Auth here! Generate a token!
            let token = jwt.sign({ id: user.id, userName: user.userName, account: user.account.id, isAdmin: user.isAdmin, isSuper: user.isSuper }, RESTApi.instance.appSettings.TOKEN_SECRET, { expiresIn: RESTApi.instance.appSettings.TOKEN_EXPIRE_TIME });

            return res.json({ access_token: token });
        }
        catch (err) {
            console.error(err);
            return ResultsHelper.sendResult(res, { message: err.message }, 500);
        }
    }
    @ExpressController.post('/register', [])
    async register(req, res) {
        try {
            let usernameUser = await getConnection().getRepository(Users).findOne({ where: { userName: req.body.userName } });
            let emailUser = await getConnection().getRepository(Users).findOne({ where: { userName: req.body.userName } })
            if (usernameUser || emailUser) {
                return res.json({ unUsed: usernameUser ? true : false, emailUsed: emailUser ? true : false });
            }
            let account = new Accounts();
            let user = new Users();
            await getConnection().getRepository(Accounts).save(account);
            let model: UserView = req.body;
            user.account = account;
            user.email = model.email.toLowerCase();
            user.firstName = model.firstName;
            user.lastName = model.lastName;
            user.password = await bcrypt.hashSync(model.password, Number(RESTApi.instance.appSettings.PASSWORD_SALT_ROUNDS));
            user.isAdmin = true;
            user.isSuper = false;
            user.userName = model.userName.toLowerCase();
            user.id = 0;
            await getConnection().getRepository(Users).save(user);

            for(const store of this.defaults.stores)
            {
                let newStore = new Stores();
                newStore.name= store.name;
                newStore.account = account;
                await getConnection().getRepository(Stores).save(newStore);
            }

            for(const section of this.defaults.sections)
            {
                let newSection = new Sections();
                newSection.name= section.name;
                newSection.account = account;
                await getConnection().getRepository(Sections).save(newSection);
            }

            for(const brand of this.defaults.brands)
            {
                let newBrand = new Brands();
                newBrand.name= brand.name;
                newBrand.account = account;
                await getConnection().getRepository(Brands).save(newBrand);
            }

            for(const type of this.defaults.types)
            {
                let newType = new Types();
                newType.name= type.name;
                newType.account = account;
                await getConnection().getRepository(Types).save(newType);
            }

            for(const tag of this.defaults.tags)
            {
                let newTag = new Tags();
                newTag.name= tag.name;
                newTag.account = account;
                await getConnection().getRepository(Tags).save(newTag);
            }
            user = await getConnection().getRepository(Users).findOne(user.id, { relations: ['account'] });
            let token = jwt.sign({ id: user.id, userName: user.userName, account: user.account.id, isAdmin: user.isAdmin, isSuper: user.isSuper }, RESTApi.instance.appSettings.TOKEN_SECRET, { expiresIn: RESTApi.instance.appSettings.TOKEN_EXPIRE_TIME });

            return res.json({ access_token: token });
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, { error: e }, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }
}
