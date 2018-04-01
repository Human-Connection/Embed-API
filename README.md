# Embed API

> URL Embed API with Caching

## About

This API uses [Metaphor](https://www.npmjs.com/package/metaphor) for fetching URL data from multiple sources.

## How to use this image

Make sure you have installed [docker](https://www.docker.com/community-edition).

To start the service simply run:

```bash
docker run 
```

## Development

1. Make sure you have [NodeJS](https://nodejs.org/), [yarn](https://yarnpkg.com) and [mongoDB](https://www.mongodb.com/download-center#community) installed.
2. Install your dependencies

    ```
    cd path/to/embed-api; yarn install
    ```

3. Start your app

    ```
    yarn dev
    ```

4. Get URL Information
   
   ```
   http://localhost:3050/embeds?url=http://www.human-connection.org/
   ```

5. Do something creative with the following output
   (More information here: [Metaphor](https://www.npmjs.com/package/metaphor))

   ```
   {
        site_name: 'YouTube',
        url: 'https://www.youtube.com/watch?v=cWDdd5KKhts',
        title: 'Cheese Shop Sketch - Monty Python\'s Flying Circus',
        image: { url: 'https://i.ytimg.com/vi/cWDdd5KKhts/maxresdefault.jpg' },
        description: 'Subscribe to the Official Monty Python Channel here - http://smarturl.it/SubscribeToPython Cleese plays an erudite customer attempting to purchase some chees...',
        type: 'video',
        video: [
            {
                url: 'https://www.youtube.com/embed/cWDdd5KKhts',
                type: 'text/html',
                width: '480',
                height: '360'
            },
            {
                url: 'https://www.youtube.com/v/cWDdd5KKhts?version=3&autohide=1',
                type: 'application/x-shockwave-flash',
                width: '480',
                height: '360',
                tag: ['Monty Python', 'Python (Monty) Pictures Limited', 'Comedy', 'flying circus', 'monty pythons flying circus', 'john cleese', 'micael palin', 'eric idle', 'terry jones', 'graham chapman', 'terry gilliam', 'funny', 'comedy', 'animation', '60s animation', 'humor', 'humour', 'sketch show', 'british comedy', 'cheese shop', 'monty python cheese', 'cheese shop sketch', 'cleese cheese', 'cheese']
            }
        ],
        thumbnail: {
            url: 'https://i.ytimg.com/vi/cWDdd5KKhts/hqdefault.jpg',
            width: 480,
            height: 360
        },
        embed: {
            type: 'video',
            height: 344,
            width: 459,
            html: '<iframe width="459" height="344" src="https://www.youtube.com/embed/cWDdd5KKhts?feature=oembed" frameborder="0" allowfullscreen></iframe>'
        },
        app: {
            iphone: {
                name: 'YouTube',
                id: '544007664',
                url: 'vnd.youtube://www.youtube.com/watch?v=cWDdd5KKhts&feature=applinks'
            },
            ipad: {
                name: 'YouTube',
                id: '544007664',
                url: 'vnd.youtube://www.youtube.com/watch?v=cWDdd5KKhts&feature=applinks'
            },
            googleplay: {
                name: 'YouTube',
                id: 'com.google.android.youtube',
                url: 'https://www.youtube.com/watch?v=cWDdd5KKhts'
            }
        },
        player: {
            url: 'https://www.youtube.com/embed/cWDdd5KKhts',
            width: '480',
            height: '360'
        },
        twitter: { site_username: '@youtube' },
        icon: {
            '32': 'https://s.ytimg.com/yts/img/favicon_32-vfl8NGn4k.png',
            '48': 'https://s.ytimg.com/yts/img/favicon_48-vfl1s0rGh.png',
            '96': 'https://s.ytimg.com/yts/img/favicon_96-vfldSA3ca.png',
            '144': 'https://s.ytimg.com/yts/img/favicon_144-vflWmzoXw.png',
            smallest: 'https://s.ytimg.com/yts/img/favicon_32-vfl8NGn4k.png'
        },
        preview: '<html><head><title>Cheese Shop Sketch - Monty Python\'s Flying Circus</title></head><body><div class=\'metaphor-embed\'><div class=\'metaphor-embed-header\'><img class="metaphor-embed-header-icon" src="https://s.ytimg.com/yts/img/favicon_32-vfl8NGn4k.png"/><div class="metaphor-embed-header-site">YouTube</div><a class ="metaphor-embed-header-link" href="https://www.youtube.com/watch?v=cWDdd5KKhts"><div class="metaphor-embed-header-title">Cheese Shop Sketch - Monty Python\'s Flying Circus</div></a></div><div class=\'metaphor-embed-body\'><div class="metaphor-embed-body-description">Subscribe to the Official Monty Python Channel here - http://smarturl.it/SubscribeToPython Cleese plays an erudite customer attempting to purchase some chees...</div><img class="metaphor-embed-body-image" src="https://i.ytimg.com/vi/cWDdd5KKhts/hqdefault.jpg"/></div></div></body></html>',
        sources: ['ogp', 'resource', 'oembed', 'twitter']
    }
    ```
## Testing

Simply run `yarn test` and all your tests in the `test/` directory will be run.

## License

Copyright (c) 2018
Grzegorz Leoniec

Licensed under the [MIT license](LICENSE).
