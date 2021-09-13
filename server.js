'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

// Mongo DB
const mongoose = require('mongoose');
let Modelbook;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/readBooksData');

  const bookSchema = new mongoose.Schema({
    // The Schema is the structure or the format type of data to be stored as in noSQL.
    bookTitle: String,
    bookDescription: String,
    bookStatus: String,
    authorEmail: String,

  })
  Modelbook = mongoose.model('Novels', bookSchema);
  // seedData();
};
// seeding the data, to put initial data

async function seedData() {

  const philosophy = new Modelbook({
    bookTitle: 'عالم صوفي',
    bookDescription:
      'ضمن إطار أدبي يطرح جوستاين غاردر تساؤلات فلسفية تطال الحياة والوجود، يطل ذلك من خلال رسالتين أُرسلتا لصوفي، محور هذه الرواية، مضمونهما مختصر لا محدود في آن معاً: "من أنت" تسأل الأولى، و"من أين جاء العالم" تسأل الثانية... ينطلق جوستان من هذين السؤالين ليغوص عميقاً في تاريخ الفلسفة، التي تحمل في طياتها فلسفات انطلقت من نقطة أساسية من هذا الوجود. غاص جوستاين من خلال صوفي ومع الفلاسفة من خلال فكرهم في محاولة للإجابة على هذين التساؤلين... في إطار هذه الرواية التي هى ليست كأية رواية.',
    bookStatus: 'Sold',
    authorEmail: 'jostaingarder@gmail.com'
  })

  const religion = new Modelbook({
    bookTitle: 'الإسلام بين الشرق والغرب',
    bookDescription:
      'كتاب «الإسلام بين الشرق والغرب»، هو نتيجة لدراسة واسعة متعددة الجوانب لأبرز الأفكار العالمية في تاريخ البشرية المعاصر. إن ظاهرة نسيان الذات التي تميز بها التاريخ الحديث للعالم الإسلامي، تضع المفكر الشرقي والغربي على السواء في موقف مماثل من هذا الكتاب. فمن خلال الدراسة المقارنة للمقدمات الأساسية والنتائج المترتبة عليها في المجالات الاجتماعية والقانونية والسياسية والثقافية والنفسية، وغيرها من المجالات للأيديولوجيتين اللتين حددتا أقدار الجنس البشري على مدى القرون الأخيرة. من خلال هذه الدراسة يكشف لنا المؤلف عن أعراض المشهد المأساوي المتزايد للتنصير والإلحاد في هذا العالم. فالمسيحية كمثال لظاهرة دينية حضارية ـ أعني دينًا بمعناه الغربي معزولاً عن قانون الوحي ـ هي فكرة شاملة للإبداع والحضارة والفن والأخلاق، وبهذا حلقت المسيحية في روحانية التاريخ. أما الإلحاد الذي يستند إلى مدخل مادي ـ الاشتراكية منظوره العملي والتاريخي ـ هذا الإلحاد هو العامل المشترك للعناصر التطورية والحضارية والسياسية والطوباوية التي تُعنى بالطبيعة المادية للإنسان وتاريخه',
    bookStatus: 'Avaliable',
    authorEmail: 'aliezzat@gmail.com'
  })

  const novel = new Modelbook({
    bookTitle: 'رأيت رام الله',
    bookDescription:
      '"رأيت رام الله" كتاب فاز بجائزة نجيب محفوظ للإبداع الأدبي (1997) هل هي رام الله سرّ الإبداع المحقق!! أم أنها الثلاثون عاماً من الغربة أشعلت في القلب الحنين والاشتياق إلى ساكني رام الله!! أم أنه الوطن المحرم المنتظر على مشارف جسر العبور... جسر العودة ذاك الذي سكن في ذاكرة مريد البرغوثي بصرير خشبة، وبضيق مساحته وقصر طوله. هو ذاك الجسر القصير مشت عبره الذاكرة إلى ذاك الأفق الرحب المشبع برائحة الأهل والمترع بالصور القديمة الساكنة في الوجدان.',
    bookStatus: 'Avaliable',
    authorEmail: 'MureedBarthg@gmail.com',
  })
// put await for promise because it will take time to complete. also put async to function.
  await philosophy.save();
  await religion.save();
  await novel.save();
};

// Routes
app.get('/', homeHandler);
app.get('./Novels', bookHandler);

// Functions Handlers
function homeHandler(req, res) {
  res.send('Home Page');
};

function bookHandler (req,res){
  const email = req.query.email;
  Modelbook.find({authorEmail:email},(err,result) => {
    if (err) {
      console.log(err);
    }
    else {
     res.send(result);
    }
  });
};


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});
