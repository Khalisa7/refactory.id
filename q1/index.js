const terminal = require('readline');
const lineLength = 30;
const syntax = {
  restoName: null,
  restoDate: null,
  restoCashier: null,
  restoMenu: []
};

const cmd = terminal.createInterface({
  input: process.stdin,
  output: process.stdout
});


const main = () => {
  cmd.prompt();
  console.log('Selamat Datang!!!');

  cmd.question("Masukan Nama Resto : ", (input) => {
    syntax.restoName = input;
    cmd.question("Masukan Tanggal : ", (input) => {
      syntax.restoDate = input;
      cmd.question("Masukan Nama : ", (input) => {
        syntax.restoCashier = input;
        console.log("Masukan Menu (spasi) Harga : \n");
        cmd.on('line', (input) => {
          if (input !== "exit" && input.split(' ').length === 2) {
            syntax.restoMenu.push({
              menu: input.split(' ')[0],
              price: input.split(' ')[1]
            });
          }
          else { cmd.close(); }
        });
      });
    });
  });

  cmd.on('close', () => {
    console.log('\n');
    console.log(syntax.restoName);
    console.log(syntax.restoDate);
    console.log(syntax.restoCashier);

    var res = [], sum = 0, sumText = "Total", dots = "";;
    // Grouping
    syntax.restoMenu.map((data, i) => {
      if (data.menu.length > lineLength) {
        var temp = data.menu, position = 1, i = 1;

        do {
          res.push(temp.slice((position - 1), lineLength));

          i = i + 1;
          temp = temp.slice(lineLength);
        } while (temp.length > lineLength);

        dots = "";
        for (var i = 0; i < (lineLength - parseInt(temp.length + data.price.length)); i++) {
          dots += ".";
        };

        res.push(temp + dots + data.price);
      } else {
        dots = "";
        for (var i = 0; i < (parseInt(lineLength) - parseInt(data.menu.length) - parseInt(data.price.length)); i++) {
          dots += ".";
        }
        res.push(data.menu + dots + data.price);
      }
    })

    // Result
    console.log('\n');
    res.map((data, i) => {
      console.log(data);
    });

    // Total
    console.log('\n');
    for (var i = 0; i < syntax.restoMenu.length; i++) {
      sum = parseInt(syntax.restoMenu[i].price) + parseInt(sum);
    }

    // Sum Text
    dots = "";
    for (var i = 0; i < lineLength - (sumText.length + sum.toString().length); i++) {
      dots += ".";
    }
    console.log(sumText + dots + sum);

    process.exit(0);
  });
};

main();