npm i @angular/cli
npx ng new name_project
git add .
git commit -m "update"
git push
npx ng add @angular/material

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

  content: [
    "./src/**/*.{html,ts}",
  ],

@tailwind base;
@tailwind components;
@tailwind utilities;
npx ng add @angular/pwa
npx ng g c todos/detail --skip-tests --standalone

npx ng g c facecomparison --skip-tests --standalone


docker build -t fechikiet . 

docker build -t gcr.io/chikietcom-62cf8/fechikiet . 

gcloud docker --quiet --project chikietcom-62cf8 push gcr.io/chikietcom-62cf8/fechikiet