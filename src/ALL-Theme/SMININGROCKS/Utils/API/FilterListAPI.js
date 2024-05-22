import { CommonAPI } from "./CommonAPI" 

export const FilterListAPI = async(param) =>{

    console.log("paramfilter",param);

    let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
    let userEmail = localStorage.getItem("userEmailForPdList")

    let encodedFilter = {
        "FilterKey":`${param?.FilterKey}`,
        "FilterVal":`${param?.FilterVal}`,
        "FilterKey1":`${param?.FilterKey1}`,
        "FilterVal1":`${param?.FilterVal1}`,
        "FilterKey2":`${param?.FilterKey2}`,
        "FilterVal2":`${param?.FilterVal2}`,
      }

    const data = {
        "PackageId":`${loginInfo?.PackageId}`,
        "autocode":"","FrontEnd_RegNo":`${storeinit?.FrontEnd_RegNo}`,
        "Customerid":`${loginInfo?.id}`,
        "Filter":btoa(JSON.stringify(encodedFilter)),
      }
      let encData =  btoa(JSON.stringify(data))
      console.log('encodedFilter',encodedFilter);

      let body = {
        "con":`{\"id\":\"\",\"mode\":\"GETFILTERLIST\",\"appuserid\":\"${userEmail}\"}`,
        "f":"onClcikofMenuList (GETFILTERLIST)",
        "p":encData
      }

    let CategoryFilter;
    let ProductTypeFilter;
    let GenderFilter;
    let CollectionFilter;
    let BrandFilter;
    let OcassionFilter;
    let ThemeFilter;
    let SubCategoryFilter;

    await CommonAPI(body).then((res) => {
        if(res){
            console.log("res",res);

            CategoryFilter = res?.Data.rd1
            ProductTypeFilter = res?.Data.rd12
            GenderFilter = res?.Data.rd4;
            CollectionFilter = res?.Data.rd
            BrandFilter = res?.Data.rd3
            OcassionFilter = res?.Data.rd5
            ThemeFilter = res?.Data.rd6
            SubCategoryFilter = res?.Data.rd2
        }
    })

    localStorage.setItem("CategoryFilter",JSON.stringify(CategoryFilter));
    localStorage.setItem("ProductTypeFilter",JSON.stringify(ProductTypeFilter));
    localStorage.setItem("GenderFilter",JSON.stringify(GenderFilter));
    localStorage.setItem("CollectionFilter",JSON.stringify(CollectionFilter));
    localStorage.setItem("BrandFilter",JSON.stringify(BrandFilter));
    localStorage.setItem("OcassionFilter",JSON.stringify(OcassionFilter));
    localStorage.setItem("ThemeFilter",JSON.stringify(ThemeFilter));
    localStorage.setItem("SubCategoryFilter",JSON.stringify(SubCategoryFilter));

}