import api from '../lib/axios'

export default{

    getCategories(){
        return api.get('/list.php?c=list')
    },
    searchFoodRecipes({categorie,ingredient}){
        return api.get(`/filter.php?c=${categorie}&i=${ingredient}`)
    },
    searchFoodRecipe(id){
        return api.get(`/lookup.php?i=${id}`)
    },
}
