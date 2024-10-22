/* eslint-disable */
import * as Router from "expo-router";

export * from "expo-router";

declare module "expo-router" {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string>
      extends Record<string, unknown> {
      StaticRoutes:
        | `/`
        | `/(tabs)`
        | `/(tabs)/`
        | `/(tabs)/pantry`
        | `/(tabs)/recipes`
        | `/(tabs)\pantry`
        | `/(tabs)\recipes`
        | `/..\components\IngredientInput`
        | `/..\components\RecipeModal`
        | `/_sitemap`
        | `/pantry`
        | `/recipes`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
