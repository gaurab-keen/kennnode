import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
    
    app.customFields.register(
      {
        name: "test-plugin",
        pluginId: "test-plugin",
        type: "string",
        intlLabel: {
        id: "test-plugin.label",
        defaultMessage: "Review Tag",
        },
        intlDescription: {
        id: "test-plugin.description",
        defaultMessage: "Tab to create Review",
        },
        components: {
        Input: async() =>
        import ( /* webpackChunkName: "input-component" */ './components/TestPlugin'),
        
        },
        options: {},
        });  
        app.customFields.register(
          {
            name: "test-plugin1",
            pluginId: "test-plugin",
            type: "string",
            intlLabel: {
            id: "test-plugin1.label",
            defaultMessage: "NestedField",
            },
            intlDescription: {
            id: "test-plugin1.description",
            defaultMessage: "Tab to create NestedField",
            },
            components: {
            Input: async() =>
            import ( /* webpackChunkName: "input-component" */ './components/NewTest'),
            
            },
            options: {},
            });   

        

  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
