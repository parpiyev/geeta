import { SampleStorage } from "./mongo/sample"
import { CategoryStorage } from "./mongo/category"
import { ProductStorage } from "./mongo/product"
import { UserStorage } from "./mongo/user"

interface IStorage {
    sample: SampleStorage
    category: CategoryStorage
    product: ProductStorage
    user: UserStorage
}

export let storage: IStorage = {
    sample: new SampleStorage(),
    category: new CategoryStorage(),
    product: new ProductStorage(),
    user: new UserStorage()
}
