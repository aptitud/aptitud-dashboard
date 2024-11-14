# Aptitud Dashboard

## Getting Started

To get started an run localy do the following:

-   Clone code from [GitHub](https://github.com/aptitud/aptitud-dashboard)
-   Copy make a copy of `.env.example` and name it `.env.local`

    -   Get .env.local content with [AptitudToolbox](https://github.com/aptitud/aptitud-toolbox) command `Get-Secret aptitud-dashboard`
    -   If the avbove doesn't work for you, values can be found in `Config Vars` on [Heroku](https://dashboard.heroku.com/apps/aptitud-dashboard/settings)

-   run `npm install`
-   run `npm run dev`

## Deploy

To deploy to Heroku just push the code to the `main` branch

If you add a configuration key, dont forget to add the key name to the `.env.example` file. And upload the new content to secret manager with [AptitudToolbox](https://github.com/aptitud/aptitud-toolbox) command `Set-Secret -SecretName aptitud-dashboard -File <path_to_.env.local>`
