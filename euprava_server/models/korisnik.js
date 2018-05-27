module.exports = function (sequelize, Sequelize) {

    var Korisnik = sequelize.define('korisnik', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            unique: true
        },
        jmbg: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        ime: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        prezime: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        email: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        zanimanje:{
            type: Sequelize.STRING,
            notEmpty: true
        },
        datumRodjenja:{
            type: Sequelize.STRING,
            notEmpty: true
        },
        adresa:{
            type: Sequelize.STRING,
            notEmpty: true
        },
        kljuc: {
            type: Sequelize.STRING
        },
        pol:{
            type: Sequelize.STRING,
            notEmpty: true
        },
        korisnickoIme: {
            type: Sequelize.STRING,
        },
        brojTelefona: {
            type: Sequelize.STRING,
        },
        lozinka: {
            type: Sequelize.STRING
        },
        statusKorisnika: {
            type: Sequelize.BOOLEAN
        }

    }, {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,

            // don't delete database entries but set the newly added attribute deletedAt
            // to the current date (when deletion was done). paranoid will only work if
            // timestamps are enabled
            paranoid: true,

            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,

            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,

            // define the table's name
            tableName: 'korisnik'
        });

    return Korisnik;
}