import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Teriyaki Chicken',
  //     'Chicken breast chunks with a teriyaki sauce served with rice and broccoli.',
  //     'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2Farchive%2F01410577b65b0fa720ffaf8a514172d4e4c82e4f',
  //     [
  //       new Ingredient('Chicken Breast', 6, 'oz'),
  //       new Ingredient('White Rice', 2, 'cup(s)'),
  //       new Ingredient('Broccoli', 2, 'cup(s)'),
  //     ]
  //   ),
  //   new Recipe(
  //     'Cowboy Burger',
  //     'Double cheeseburger with bacon, an onion ring, jalapenos, and BBQ sauce.',
  //     'https://iamhomesteader.com/wp-content/uploads/2023/05/rodeo-burger-800x736.jpg',
  //     [
  //       new Ingredient('80/20 Ground Beef', 1, 'lb(s)'),
  //       new Ingredient('Hamburger Buns', 6, 'each'),
  //       new Ingredient('Pepperjack Cheese', 6, 'slices'),
  //       new Ingredient('Bacon', 1, 'lb'),
  //       new Ingredient('Onion Rings', 6, 'each'),
  //       new Ingredient('Jalapeno', 2, 'each'),
  //       new Ingredient('BBQ sauce of choice', 1, 'each'),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    // This will emit a copy of the recipes array.
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
