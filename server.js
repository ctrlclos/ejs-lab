const express = require('express');
const app = express();

const RESTAURANT = {
  name: 'The Green Byte Bistro',
  isOpen: false,
  address: '742 Evergreen Rd, Mapleview, OS 45502',
  phone: '555-321-9876',
  menu: [
    {
      id: 1,
      name: 'Quantum Quinoa Mushroom Burger',
      price: 13.00,
      rating: 4,
      category: 'mains',
      details: 'A vegetarian burger made with a quinoa and mushroom patty, it will take you to another realm.'
    },
    {
      id: 2,
      name: 'Binary Berry Cheesecake',
      price: 10.11,
      rating: 3,
      category: 'desserts',
      details: 'A creamy cheesecake bursting with flavor. A mix of berries in every byte.'
    },
    {
      id: 3,
      name: 'Recursive Rigatoni',
      price: 17.00,
      rating: 5,
      category: 'mains',
      details: 'A classic rigatoni pasta dish, layered with rich tomato sauce and herbs. You\'ll keep coming back for more.'
    },
    {
      id: 4,
      name: 'Pumpkin Pi Squared',
      price: 3.14,
      rating: 5,
      category: 'desserts',
      details: 'A delightful pumpkin dessert, squared and spiced to perfection.'
    },
    {
      id: 5,
      name: 'Fibonacci String Bean Fries',
      price: 11.23,
      rating: 5,
      category: 'sides',
      details: 'Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.'
    }
  ]
}
// available to any request application wide
//app.locals.restaurant = RESTAURANT;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  //available within this request only
  res.locals.restaurant = RESTAURANT;
  res.render('home');
});

app.get('/menu', (req, res) => {
  res.locals.menu = RESTAURANT.menu;

  res.locals.mains = RESTAURANT.menu.filter((menuItem) => menuItem.category == 'mains');
  res.locals.deserts = RESTAURANT.menu.filter((menuItem) => menuItem.category == 'desserts');
  res.locals.sides = RESTAURANT.menu.filter((menuItem) => menuItem.category == 'sides');

  res.locals.categoryNames = {
    mains: 'Main Courses',
    desserts: 'Delicious Desserts',
    sides: 'Side Dishes',
  }

  res.render('menu');
})

app.get('/menu/:category', (req, res) => {
  if(req.params.category) {
    res.locals.filteredMenu = RESTAURANT.menu.filter((menuItem) => menuItem.category === req.params.category);
    res.locals.categoryName = upperCaseWord(req.params.category);
    res.render('category')
  } else {
    res.status(404).send('Category not found!');
  }
})

const upperCaseWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

app.listen(3000);
