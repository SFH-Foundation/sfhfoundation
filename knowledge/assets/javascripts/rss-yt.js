

const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())
const url = new URL('https://www.youtube.com/feeds/videos.xml?channel_id=UCHiMY_Scws1sB_bn84G-YXg')

/* Fetch the RSS Feed */
fetch(url).then((res) => {
    var frag = document.createDocumentFragment()
	var hasBegun = true
    res.text().then((xmlTxt) => {
        /* Parse the RSS Feed and display the content */
        try {
            let doc = DOMPARSER(xmlTxt, "text/xml")
            doc.querySelectorAll('entry').forEach((entry) => {
                let temp = document.importNode(document.querySelector('template').content, true);
                let i = entry.querySelector.bind(entry)
                let t = temp.querySelector.bind(temp)
                t('h2').textContent = !!i('title') ? i('title').textContent.slice(0, 63) : ' -'
                t('a').textContent = t('a').href = !!i('link') ? i('link').textContent : '#'
                t('a').innerHTML = 'Listen Now'
                t('p').innerHTML = !!i('media:description') ? i('media:description').textContent.slice(0, 60) + '...' : '-'
                frag.appendChild(temp)
            })
        } catch (e) {
            console.error('Error in parsing the feed')
        }
        if(hasBegun) {
            document.querySelector('output').textContent = ''; 
            hasBegun = false;
        }
        document.querySelector('output').appendChild(frag)
    })
}).catch(() => console.error('Error in fetching the RSS feed'))
