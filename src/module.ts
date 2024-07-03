import { defineNuxtModule, addPlugin, installModule, createResolver, addComponentsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-hpcaptcha',
    configKey: 'nuxtHPCaptcha',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve("./runtime/components"), // path of components
      pathPrefix: false, // Prefix component name by its path.
      prefix: "", // Prefix all matched components.
      global: true, // Registers components to be globally available.
 });


 _nuxt.hook("nitro:config", async (nitroConfig)=>{
  //if not already available, initialize as empty array
  nitroConfig.publicAssets ||= [];
  nitroConfig.publicAssets.push({
    dir: resolver.resolve("./runtime/assets"), //path of assets
    maxAge: 60 * 60 * 24 * 365 //cache assets for 1 year
  })
 });

  await installModule("nuxt-icon")

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
