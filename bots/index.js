const puppeteer = require('puppeteer');
//const { JSDOM } = require('jsdom');
const fs = require('fs');


 
const gfg = async () => {
 const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.geeksforgeeks.org/must-do-coding-questions-for-companies-like-amazon-microsoft-adobe/');
  const Questions = await page.evaluate(() => {
    x = []
    x = Array.from(document.querySelector('#post-152831 > div > ol:nth-child(8)').getElementsByTagName('li'));
    anchor = x.map( x => (x.querySelector('a')))
    
    el = anchor.map(anchor => {
      if (anchor != null){
        return {name : anchor.innerText , link : anchor.href}
      }
      else{
        return null
      }
    })
    return el;
  });


const que = await quepage(Questions , browser);

fs.writeFileSync('./data.json', JSON.stringify(que, null, 2)  , 'utf-8');
 
  await browser.close();
};

const quepage = async (list , browser) => {
    const page = await browser.newPage();
   

    console.log(list);
    let questionList = [];

    for (let i = 0 ; i < list.length ; i++) {

        console.log(list[i].name)
       await page.goto(list[i].link);
        const info = await page.evaluate(() => {

            const desc = document.querySelector('#problems > div.problem-statement > p:nth-child(2) > span') ? document.querySelector('#problems > div.problem-statement > p:nth-child(2) > span').innerText :  document.querySelector('#problems > div.problem-intro > div.row.problem-intro__row > span.problem-tab__name').innerText

            return {
                Question : document.querySelector('#problems > div.problem-intro > div.row.problem-intro__row > span.problem-tab__name').innerText,
                Description : desc,
                link : window.location.href,
                Companys : document.querySelector('#companyTags > div').innerText,
                Tags : document.querySelector('#topicTags > div').innerText 
            };
        })

        questionList.push(info);

      

    }
  

return questionList;

}

/*const quedom = async (question) => {
    const qdom = new JSDOM(listElement);
    let domobj = sdom.window.document;

    return{
        Question : domobj.querySelector('#problems > div.problem-intro > div.row.problem-intro__row > span.problem-tab__name')
    }

}*/

gfg()