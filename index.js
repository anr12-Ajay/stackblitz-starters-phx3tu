const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

function welcomemessage() {
  return 'Welcome to our service';
}

app.get('/welcome', (req, res) => {
  res.send(welcomemessage());
});

function greetingmessage(username) {
  return 'Hello, ' + username + '!';
}

app.get('/greet', (req, res) => {
  let username = req.query.username;
  res.send(greetingmessage(username));
});

function checkpasswordlength(password) {
  if (password.length > 15) {
    return 'Password is strong';
  } else {
    return 'Password is weak';
  }
}

app.get('/check-password', (req, res) => {
  let password = req.query.password;
  res.send(checkpasswordlength(password));
});

function sumofNumbers(num1, num2) {
  let sum = num1 + num2;
  return sum.toString();
}

app.get('/sum', (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  res.send(sumofNumbers(num1, num2));
});

function checkSubscription(username, isSubscribed) {
  if (isSubscribed) {
    return username + ' is Subscribed';
  } else {
    return username + ' is not subscribed';
  }
}
app.get('/subscription-status', (req, res) => {
  let username = req.query.username;
  let isSubscribed = req.query.isSubscribed == 'true';

  res.send(checkSubscription(username, isSubscribed));
});
function discountedPrice(price, discount) {
  let discountPrice = price - (discount * price) / 100;
  return discountPrice.toString();
}

app.get('/discounted-price', (req, res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  res.send(discountedPrice(price, discount));
});

function PersonalizedGreet(age, gender, name) {
  return 'Hello, ' + name + '!' + ' You are a ' + age + ' year old ' + gender;
}

app.get('/personalized-greeting', (req, res) => {
  let age = parseFloat(req.query.age);
  let gender = req.query.gender;
  let name = req.query.name;
  res.send(PersonalizedGreet(age, gender, name));
});
function finalPrice(price, discount, tax) {
  let discountedPrice = price - (discount * price) / 100;
  let final = discountedPrice + (tax * discountedPrice) / 100;
  return final.toString();
}

app.get('/final-price', (req, res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  let tax = parseFloat(req.query.tax);
  res.send(finalPrice(price, discount, tax));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
