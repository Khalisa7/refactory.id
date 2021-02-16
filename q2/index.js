const data = require('./example.json');
const terminal = require('readline');

const cmd = terminal.createInterface({
  input: process.stdin,
  output: process.stdout
});

const findUserDontHavePhoneNumber = (arr) => {
  let result = arr.filter(({ profile: { phones } }) => { return phones.length === 0 })
  return result;
}

const findUserHaveArticles = (arr) => {
  let result = arr.filter((data) => { return data['articles:'].length !== 0 })
  return result;
}

const findUserHaveAnnisAtNames = (arr) => {
  let result = arr.filter(({ profile: { full_name } }) => { return full_name.match(/annis/gi) })
  return result;
}

const findUserHaveArticlesOn2020 = (arr) => {
  let result = arr.filter((data) => {
    let articles = data['articles:'].some(({ published_at }) => {
      return published_at.slice(0, 4) === '2019'
    })
    return articles
  })
  return result;
}

const findUserBorn1986 = (arr) => {
  let result = arr.filter(({ profile: { birthday } }) => { return birthday.slice(0, 4) === "1986" })
  return result;
}

const findUserArticleContainsTipsAtTitle = (arr) => {
  let temp = arr.filter((data) => {
    let articles = data['articles:'].some(({ title }) => {
      return title.toLowerCase().includes("tips");
    })
    return articles
  })

  let result = temp.map((data) => {
    return data['articles:']
  })

  return result.flat().filter(({ title }) => {
    return title.toLowerCase().includes("tips");
  });
}

const findUserArticlePublishedBeforeAugust = (arr) => {
  let temp = arr.filter((data) => {
    let articles = data['articles:'].some(({ published_at }) => {
      return new Date(published_at) < new Date("2019-08-01")
    })
    return articles
  })

  let result = temp.map((data) => {
    return data['articles:']
  })

  return result.flat()
}

const main = () => {
  cmd.prompt();

  console.log('Selamat Datang!!!');
  console.log(`
    1.  Find users who don't have any phone numbers. 
    2.  Find users who have articles. 
    3.  Find users who have "annis" on their name. 
    4.  Find users who have articles on the year 2020. 
    5.  Find users who are born in 1986. 
    6.  Find articles that contain "tips" on the title. 
    7.  Find articles published before August 2019.
    8.  Exit.
  `);

  cmd.question("Masukan Pilihan!!! ", (input) => {
    switch (input) {
      case '1':
        console.log(findUserDontHavePhoneNumber(data));
        break;
      case '2':
        console.log(findUserHaveArticles(data));
        break;
      case '3':
        console.log(findUserHaveAnnisAtNames(data));
        break;
      case '4':
        console.log(findUserHaveArticlesOn2020(data));
        break;
      case '5':
        console.log(findUserBorn1986(data));
        break;
      case '6':
        console.log(findUserArticleContainsTipsAtTitle(data))
        break;
      case '7':
        console.log(findUserArticlePublishedBeforeAugust(data))
        break;
    }
  });

};

main();