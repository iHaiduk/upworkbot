const cmd = require('node-cmd');
const moment = require('moment');
const Telegraf = require('telegraf');
const token = '450350889:AAEq2SRS4ix2Q9QiCxQwXZVQbz5h8DCqTA0';
const bot = new Telegraf(token);
const readyIDS: any = {};

const get = (query: string, pageNum: number = 1, callback: (...args: any[]) => any) => {
    cmd.get(
        `curl 'https://www.upwork.com/o/jobs/browse/url?page=${pageNum}&q=${query}&sort=renew_time_int%2Bdesc' -H 'cookie: _vhipo=0; bf_lead=sc1o9iu8rjk00; __ssid=09997bde-c2d9-4dc1-b600-5c3cbad4a4b9; recognized=1; acced8512167=8747131; _ga=GA1.2.1833044784.1507997492; optimizelyEndUserId=oeu1507997492518r0.24808512478896905; visitor_id=195.50.220.103.1507997490109875; _pxff_tm=1; device_view=full; sc.ASP.NET_SESSIONID=hyjvnv1yjiyzza0hdqquhgnf; __troRUID=e88ba8c3-2ec5-4d86-95b8-300834369f03; ki_r=; __zlcmid=kph6HSuyLS3lhO; ostep_test=7scvb9khlc3l5h3446k5crt0q5; mp_b36aa4f2a42867e23d8f9907ea741d91_mixpanel=%7B%22distinct_id%22%3A%20%22c6b58272-4ba3-9c25-e47e-825865b51793%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.upwork.com%2Fab%2Fprofiles%2Fsearch%2F%3Ftests%3D982%22%2C%22%24initial_referring_domain%22%3A%20%22www.upwork.com%22%7D; mp_fdf88b8da1749bafc5f24aee259f5aa4_mixpanel=%7B%22distinct_id%22%3A%20%221604a046fd9551-0fdbebadecd7ca-17386d57-232800-1604a046fda927%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.upwork.com%2Ffreelancers%2Fsettings%2FcontactInfo%22%2C%22%24initial_referring_domain%22%3A%20%22www.upwork.com%22%7D; DA[bestgitara]=acae81a68150ffca23995c258074e41f%2C0%2Cv8%2C1526025460; _gid=GA1.2.35638717.1518378172; _mkto_trk=id:518-RKL-392&token:_mch-upwork.com-1518378497524-32693; __troSYNC=1; _sp_id.ee6a=c36492f01d40d2b0.1518378549.1.1518378549.1518378549; current_team_962775501128335360=962775501128335360; _br_uid_2=uid%3D1524616441744%3Av%3D11.8%3Ats%3D1507997493218%3Ahc%3D11; ki_t=1507997498932%3B1518378501046%3B1518378694950%3B4%3B7; __trossion=1507997495_1800_6_e88ba8c3-2ec5-4d86-95b8-300834369f03%3A1518017226_e88ba8c3-2ec5-4d86-95b8-300834369f03%3A1518378497_1518378747_4; regSuccessWaitTime=%7B%22total%22%3A%221.3%22%2C%22ga%22%3A%221.0%22%7D; __cfduid=d5ae2639296b0d09854f0e4e08297af5e1518382216; console_user=ihorhaiduk; session_id=d6d4738bdb0c9ed4620e2a2b4f178281; DA[ihorhaiduk]=dde93ac40212e902a21479a92700e8bd%2C0%2Cv8%2C1526159218; master_access_token=5bb05126.oauth2v1_8831c188f436bb1162891c7b5bba4155; oauth2_global_js_token=oauth2v1_68d90f48f625c33abba51f0c646a3017; qt_visitor_id=185.137.18.471504906991580679; company_last_accessed=d17401965; current_organization_uid=906271703847751681; XSRF-TOKEN=ae0984ab13aa7fa00075570f2e08941f; _px3=2aab4d1ebee362943d9d6d8e2175bf75d042a0ee57207a46bc69cfd962489c7f:8VhHXO61F6X/qZFz/yxcSdNlXGp8EstUQUQu/KL734MrKJBvbZLLSS/x+W6WLtyGV0VLk/phG1Lc4HGp6MSACw==:1000:ZVC36LT418WULBgGx/IfpQBhlYD5CQSF8JkTRNitxeWLxW4/ls5lLG9QqWTJWeGNqs9ylJmLZqz4XNvc+zwpKKfUaNXMWyQDrPOfYmu1sDDpS90UFMEsBrqEx4KOevwWYGvUInUUzACxz8LePRAWHPJeV/MPiPUX8hT73wf7V+k=' -H 'dnt: 1' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: ru,uk;q=0.9,en-US;q=0.8,en;q=0.7' -H 'x-requested-with: XMLHttpRequest' -H 'pragma: no-cache' -H 'x-newrelic-id: VQIBUF5RGwYDVFRVAQA=' -H 'x-odesk-user-agent: oDesk LM' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36' -H 'accept: application/json, text/plain, */*' -H 'cache-control: no-cache' -H 'authority: www.upwork.com' -H 'referer: https://www.upwork.com/o/jobs/browse/?q=${query}&sort=renew_time_int%2Bdesc' -H 'x-odesk-csrf-token: ae0984ab13aa7fa00075570f2e08941f' --compressed`, callback);
};

let page = 1;
let timeout: any;
let interval: any;
let prevResult = 0;
const maxReturnResults = 100;
let returnResults = 0;

const load = (query: string = 'react.js', ctx: any, cb: any) => {
    get(query, page, (err: any, data: any) => {
        if (err) {return; }
        try {
            const result = JSON.parse(data);
            const {paging, jobs = []} = result.searchResults;
            const {total} = paging;
            const successJob = testResult(jobs);
            let next = true;
            returnResults += successJob.length;
            cb({jobs, successJob, total, currentPrevResult: (prevResult + jobs.length), currentPage: page});

            readyIDS[ctx.from.id + query] = readyIDS[ctx.from.id] || [];

            jobs.forEach(({ciphertext}: any, index: number) => {
                if (readyIDS[ctx.from.id + query].indexOf(ciphertext) !== -1 && index > 0) {
                    next = false;
                }
            });
            readyIDS[ctx.from.id + query].push(...jobs.map(({ciphertext}: any) => ciphertext));

            if ((prevResult + jobs.length) < total && returnResults <= maxReturnResults && next) {
                prevResult += jobs.length;
                timeout = setTimeout(() => {
                    page++;
                    load(query, ctx, cb);
                }, rand(500, 2500));
            } else {
                ctx.reply('Search ended. Waiting 10 minutes for new search.');
            }
        } catch (e) {
            ctx.reply('Search ended. Waiting 10 minutes for new search.');
        }
    });
};

const rand = (min: number, max: number): number => (max - min) * Math.random() + min;

const testResult = (jobs: any[]) => {
    return jobs
        .map(({subcategory2, ciphertext, title, skills = [], amount, client, tierText, publishedOn}: any) => {
            if (subcategory2 !== 'Web Development') { return false; }
            let skillCount = 0;
            const totalFeedback = client.totalFeedback;
            const country = client.location.country;
            const amountCount = amount.amount;
            const currencyCode = amount.currencyCode;
            const totalReviews = client.totalReviews;

            const skillsTest = (skills as any[]).map(({name, prettyName}) => {
                if (/react|javascript|node/gi.test(name) || /react|javascript|node/gi.test(prettyName)) {
                    return prettyName;
                }
            }).filter((a) => Boolean(a));

            if (skillsTest.length > 0) {
                skillCount += Math.round(skillsTest.length / 3);
            }

            if (parseInt(amountCount, 10) >= 5000) {
                skillCount++;
            }

            if (country === 'United States' || country === 'United Kingdom' || country === 'Ukraine') {
                skillCount++;
            }

            if (totalFeedback >= 5) {
                skillCount++;
            }
            if (tierText === 'Expert ($$$)') {
                skillCount++;
            }

            if (skillCount >= 4) {
                return {
                    ciphertext,
                    title,
                    totalFeedback,
                    country,
                    amountCount,
                    currencyCode,
                    totalReviews,
                    skillCount,
                    publishedOn,
                    skills: skills.map((b: any) => b.prettyName).join(','),
                };
            }
        })
        .filter((a: any) => Boolean(a));
};

bot.start((ctx: any) => {
    return ctx.reply('Welcome! Write /help for see all settings.');
});
bot.hears(/find/i, (ctx: any) => {
    const query = ctx.update.message.text.replace(/(find(\s+)?)/i, '').replace(/^\s+/, '');
    ctx.reply('Searching...');
    page = 1;
    prevResult = 0;
    returnResults = 0;
    clearTimeout(timeout);
    clearInterval(interval);

    botAnswer(query, ctx);

    interval = setInterval((queryString) => {
        page = 1;
        prevResult = 0;
        returnResults = 0;
        botAnswer(queryString, ctx);
    }, 10 * 60 * 1000, query);

});

const botAnswer = (query: string, ctx: any) => {
    load(query, ctx, ({successJob, total, currentPrevResult, currentPage}: any) => {

        let answer = `~~~${successJob.length} job(s) from ${currentPage} page.~~~\n`;

        answer += `Results: ${currentPrevResult} from ${total}\n`;
        answer += `-----------------------------\n\n`;
        successJob.forEach(({title, totalFeedback, skillCount, amountCount, country, ciphertext, totalReviews, publishedOn, currencyCode, skills}: any, index: number) => {
            answer += `Job #${index + 1} from page ${currentPage}\n`;
            answer += `Title: ${title}\n`;
            answer += `ID/Link: /jobs/${ciphertext}\n`;

            answer += `Point Number: ${skillCount}\n`;
            answer += `Skills: ${skills}\n`;
            answer += `Amount: ${amountCount} ${currencyCode}\n`;
            answer += `Country: ${country}\n`;
            answer += `Total Feedback / Reviews: ${totalFeedback} / ${totalReviews}\n`;
            answer += `Published: ${moment(publishedOn).format('DD-MM-YYYY, HH:mm:ss')} (${moment(publishedOn).startOf('minute').fromNow()})\n\n`;
        });
        if (successJob.length) {
            ctx.reply(answer);
        }
    });
};

bot.command('stop', (ctx: any) => {
    clearTimeout(timeout);
    clearInterval(interval);
    page = 1;
    prevResult = 0;
    returnResults = 0;
    ctx.reply('Stopped');
});

bot.command('help', (ctx: any) => {
    let answer = '/start - Welcome :)\n';
    answer += '/help - return list of commands\n';
    answer += 'find $Query - starting search jobs by criteria $Query. Example: find React.js\n';
    answer += '/stop - stop search system\n';
    ctx.reply(answer);
});

bot.startPolling();
