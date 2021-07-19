# Prepare for war
![image](https://user-images.githubusercontent.com/13035175/126040605-7a2e30dd-3bc8-4b47-beed-86da744597a2.png)

# Preface
I got a little over-ambitious which cost me a bit of time and gave me a few bugs, but that said, I still really enjoyed the challenege- plan to make it playable by humans at some point in the future. 

Setup is fairly sraightforward- 
```bash
gh repo clone chrispydizzle/war

# for dev mode
npm run dev

# for prod
npm run build
npm run start

#for jest tests 
npm run test
```

You'll need a postgres db setup locally and configured in your .env file - the schema auto-scaffolds but would require the db to be in place. 

I've hooked it up to coralogix and newrelic as part of my heroku CI pipeline, not sure how to make that accessible without handing over the keys to my heroku account but future plans include a demo of that and how it works. 

As the prompt was for a rest API, to see anything more than the Hai page at the root you'd be best off looking at the sample post and get requests at [/demo/startGame.http](https://github.com/chrispydizzle/war/blob/main/demo/startGame.http)


# Heroku CI 
## Pre-prod (commits to main push to this environment)
https://this-means-war.herokuapp.com/

## Production
https://war-prod.herokuapp.com/

