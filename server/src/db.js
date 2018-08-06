import Sequelize from 'sequelize';

const Conn = new Sequelize(
  'database',
  'username',
  'password',
  {
    dialect:'mysql',
    host: 'localhost'
  }
);

const Person = Conn.define('person', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Picture = Conn.define('picture', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});



// Relations
Person.hasMany(Picture);
Picture.belongsTo(Person);


export default Conn;
