var questions = new Array();
var choices = new Array();
var answers = new Array();
var response = new Array();

// To add more questions, just follow the format below.

questions[0] = "1. Which of these terms means to cook food in its own juices with a small amount of fat over low heat, just until softened?";
choices[0] = new Array();
choices[0][0] = " sweating";
choices[0][1] = " simmering";
choices[0][2] = " stewing";
answers[0] = choices[0][0];

questions[1] = "2. What's the difference between a convection oven and a conventional oven?";
choices[1] = new Array();
choices[1][0] = " A convection oven uses radioactivity.";
choices[1][1] = " A convection oven lacks the broiler setting";
choices[1][2] = " A convection oven uses a fan";
answers[1] = choices[1][2];

questions[2] = "3. The chef hands you a bunch of basil and asks you to chiffonade it. What should you do with it?";
choices[2] = new Array();
choices[2][0] = " Puree them and then beat them with a whisk into a light foam.";
choices[2][1] = " Stack and then roll the leaves. Cut them into the thinnest possible strips.";
choices[2][2] = " Finely chop them. Mix them with water and sugar to produce a refreshing drink.";
choices[2][3] = " Deep-fry them until they are like thin crisp pieces of paper.";
answers[2] = choices[2][1];

questions[3] = "4. What does blanche mean?";
choices[3] = new Array();
choices[3][0] = " To restore a dehydrated food by soaking it in water or other liquid";
choices[3][1] = " To coat food with white breadcrumbs before frying or baking";
choices[3][2] = " To quickly fry food in a bit of fat in an open pan over high heat";
choices[3][3] = " To partially cook food in steam or boiling water and then plunge it in ice water";
answers[3] = choices[3][3];

questions[4] = "5. This term is normally used in baking. It means to combine butter, sugar, egg and flavoring until light and fluffy.";
choices[4] = new Array();
choices[4][0] = "Fold";
choices[4][1] = "Mix";
choices[4][2] = "Cream";
answers[4] = choices[4][0];

questions[5] = "6. Which of these classic cuts is the smallest?";
choices[5] = new Array();
choices[5][0] = " Brunoise";
choices[5][1] = " Cube";
choices[5][2] = " Julienne";
answers[5] = choices[5][0];

questions[6] = "7. To keep foods moist during cooking by brushing, drizzling or spooning on a sauce, pan juices, or wine. What is the term for this?";
choices[6] = new Array();
choices[6][0] = " Glaze";
choices[6][1] = " Baste";
choices[6][2] = " Dredge";
answers[6] = choices[6][1];


questions[7] = "8. To decorate food with fresh herbs, edible flowers, fresh vegetables, or fruit to enhance the look and taste of the dish. What is the term for this?";
choices[7] = new Array();
choices[7][0] = " Garnish";
choices[7][1] = " Refresh";
choices[7][2] = " Plump";
answers[7] = choices[6][0];


questions[8] = "9. To add an ingredient such as eggs, which hold together the other ingredients, as in meatloaf. What is the term for this?";
choices[8] = new Array();
choices[8][0] = " Blend";
choices[8][1] = " Curdle";
choices[8][2] = " Bind";
answers[8] = choices[6][2];



// response for getting 100%
response[0] = "Chef status!";
// response for getting 90% or more
response[1] = "CDC!"
// response for getting 70% or more
response[2] = "";
// response for getting over 50%
response[3] = "";
// response for getting 40% or more
response[4] = "garde manger anyone?";
// response for getting 20% or more
response[5] = "Meh, maybe you can intern?";
// response for getting 10% or more
response[6] = "You don't deserve it.";
// response for getting 9% or less
response[7] = "Get out of the kitchen!";



