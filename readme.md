# webpack

## use of babel

- used to convert es15+ code into backward compatible JS code.
- in React it is used to convert JSX into react functions (createElement())

## use of webpack

- convert multiple js files, components into single file (minimized)
- we can use different kind of loaders to handle different kind of files (eg. importing css, sass, images, svg into js files)

#### Notes:-

1.  in webpack rule, use array start evaluating from behind. <br/>
    (eg. `["style-loader","css-loader"]` ) first css-loader will run and then style-loader
2.  for css modules

    ```js
      use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true, //responsible for css modules
              },
            },
          ],
          //how to use css modules?
          import * as styles from './style.module.css'

        // below way is not working
        import styles from './style.module.css'
    ```

3.  Hot module reload for development<br/>
    two ways

    - `"start":"webpack --mode=development --watch"`<br/>
      It generate new files in dist so we have to open html file of dist using live server.
    - webpack-dev-server<br/>
      Install webpack-dev-server via npm

      ```js
      //webpack.config.js
      devServer: {
      hot: true, //hmr
      open: true, //open browser
      port: 8081, //port
      }
      ```

      In package.json `"start":"webpack-dev-server --mode=development"`

### LOADERS

- css-loader
  - convert css into valid js
- style-loader
  - take js from css-loader and inject into the dom
- babel-loader

  - use feature of babel-present-env & babel-preset-react.<br/>
    usage:

    ```js
    rule: [
      {
        test: /\.m?[j]sx?$/, //for .js & .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ];
    ```

### PLUGINS

- MiniCssExtractPlugin

  - it provide loader which can be used instead of style-loader.<br/>
    MiniCssExtractPlugin loader will extract css into separate file<br/>
    usage:

    ```js
    plugins: [new MiniCssExtractPlugin()];

    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ];
    ```

- webpack.ProvidePlugin
  - If we don't use this plugin then we have to import react in every component file.<br/>
    usage:
    ```js
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
    ];
    ```
- HtmlWebpackPlugin
  - If we don't use this plugin then webpack will only generate js or css file only. (we then manually attach this files to html file)<br/>
    If we use content-hash in file name then it is nightmare.
  - By using this plugin webpack gives us html file with js & css attached.<br/>
    usage:
  ```js
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
  ];
  // we give template which have favicon, title & root element which react needs.
  ```
- CleanWebpackPlugin<br/>
  Used to clean dist folder before webpack generate new build.<br/>
  Usage:
  ```js
  plugins: [new CleanWebpackPlugin()];
  ```
- CopyWebpackPlugin<br/>
  In react we have public folder which provides static resources.
  so we use CopyWebpackPlugin to copy all data from src/public folder and paste them in dist folder.<br/>
  usage:
  ```js
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "src/public" }],
    }),
  ];
  ```

## FOR TYPESCRIPT

install `@types/react`, `@types/react-dom`,`typescript`,`ts-loader`, <br/>

```js
// in webpack.config.js
rules: [
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  },
];

 entry: "./src/index.tsx",
 // webpack don't know .tsx, .ts files so we have to tell webpack that there will be this kind of files
resolve: { extensions: [".tsx", ".ts", ".jsx", ".js"] },
```

run command `npx tsc --init` to generate `tsconfig.json` file.

If project contains css modules or importing of images, svgs etc.. then create `.d.ts` file with following content.

```js
//.d.ts file

//we are telling ts that this kind of files will exists and we will import them
declare module "*.module.css";
declare module "*.png"
declare module "*.jpeg"
```
