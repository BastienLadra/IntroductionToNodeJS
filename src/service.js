const url = require('url')
const veriftoken = require('./veriftoken')
const string_to_slug = require('./createslug')
var jwt = require('jsonwebtoken');
var qs = require('querystring');
var client = require('./index.js').client
var MongoClient = require('mongodb').MongoClient;
var TOKEN_SECRET = "ILUVMONGOOSE";
var urldb = "mongodb+srv://IntroToNodeJs:azerty@cluster0.bvesz.mongodb.net/intronode?retryWrites=true&w=majority";
let authorName = '';

exports.authenticate = function (req, res) {

    var body = '';
    var username = '';
    var password = '';
    var _id = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        username = post.username;
        password = post.password;
        _id = post._id;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        var dbo = db.db("intronode")

        dbo.collection("author").findOne({ "username": username, "password": password }, function (err, result) {
            if (err)
                throw err;

            const token = jwt.sign({ _id: _id }, TOKEN_SECRET, { expiresIn: '1h' });

            if (!result) {
                res.statusCode = 401
                res.setHeader('Content-Type', 'application/json')
                res.end("401: unauthorized")
            } else {
                authorName = username;
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(token))
            }
        });
    });
}

exports.createpage = function (req, res) {

    veriftoken.veriftoken(req, res)

    var body = '';
    var title = '';
    var content = '';
    var slug = '';
    var publish_date = '';
    var author = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        title = post.title;
        content = post.content;
        slug = string_to_slug.string_to_slug(post.title);
        publish_date = Date.now();
        author = authorName;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        var dbo = db.db("intronode")

        var myobj = [
            {
                title: title,
                content: content,
                slug: slug,
                publish_date: publish_date,
                author: author
            }
        ]

        console.log(myobj);

        dbo.collection("pages").insert(myobj, function (err, res) {
            if (err)
                throw err;

            console.log(res);
            db.close();
        });

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end("Page created")

    });
}

exports.listpages = function (req, res) {

    veriftoken.veriftoken(req, res)

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        dbo.collection("pages").find({}).limit(2).toArray(function (err, response) {
            if (err)
                throw err;

            console.log(response);
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response));
            db.close();
        });

    });

}

exports.readpage = function (req, res) {

    veriftoken.veriftoken(req, res)

    var body = '';
    var slug_wanted = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        slug_wanted = post.slug;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        dbo.collection("pages").find({ slug: { $eq: slug_wanted, $exists: true } }, { $limit: 1 }).toArray(function (err, response) {
            if (err)
                throw err;

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response));
            db.close();
        });
    });

}

exports.updatepage = function (req, res) {

    veriftoken.veriftoken(req, res)

    var body = '';
    var title = '';
    var content = '';
    var slug = '';
    var publish_date = '';
    var author = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        title = post.title;
        content = post.content;
        slug = post.slug;
        publish_date = Date.now();
        author = authorName;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        var myobj = { slug: slug }

        var mynewobj = {
            $set:
            {
                title: title,
                content: content,
                slug: string_to_slug.string_to_slug(title),
                publish_date: publish_date,
                author: author
            }
        }

        dbo.collection("pages").update(myobj, mynewobj, function (err, response) {
            if (err)
                throw err;

            db.close();
        });

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end("Page updated");

    });
}

exports.deletepage = function (req, res) {

    veriftoken.veriftoken(req, res)

    var body = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        slug = post.slug;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        var myobj = { slug: slug }

        dbo.collection("pages").deleteOne(myobj, function (err, response) {
            if (err)
                throw err;

            db.close();
        });

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end("Page deleted");

    });
}

exports.createarticles = function (req, res) {

    veriftoken.veriftoken(req, res)

    var body = '';
    var title = '';
    var content = '';
    var slug = '';
    var publish_date = '';
    var author = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        title = post.title;
        content = post.content;
        slug = string_to_slug.string_to_slug(post.title);
        publish_date = Date.now();
        author = authorName;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        var dbo = db.db("intronode")

        var myobj = [
            {
                title: title,
                content: content,
                slug: slug,
                publish_date: publish_date,
                author: author
            }
        ]

        console.log(myobj);

        dbo.collection("article").insert(myobj, function (err, res) {
            if (err)
                throw err;

            console.log(res);
            db.close();
        });

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end("Article created")
    });

}

exports.listarticles = function (req, res) {

    veriftoken.veriftoken(req, res)

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        dbo.collection("article").find({}).limit(2).toArray(function (err, response) {
            if (err)
                throw err;

            console.log(response);
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response));
            db.close();
        });

    });

}

exports.readarticle = function (req, res) {

    veriftoken.veriftoken(req, res)

    var body = '';
    var slug_wanted = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        slug_wanted = post.slug;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        dbo.collection("article").find({ slug: { $eq: slug_wanted, $exists: true } }, { $limit: 1 }).toArray(function (err, response) {
            if (err)
                throw err;

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response));
            db.close();
        });
    });

}

exports.updatearticle = function (req, res) {

    veriftoken.veriftoken(req, res)

    var body = '';
    var title = '';
    var content = '';
    var slug = '';
    var publish_date = '';
    var author = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        title = post.title;
        content = post.content;
        slug = post.slug;
        publish_date = Date.now();
        author = authorName;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        var myobj = { slug: slug }

        var mynewobj = {
            $set:
            {
                title: title,
                content: content,
                slug: string_to_slug.string_to_slug(title),
                publish_date: publish_date,
                author: author
            }
        }

        dbo.collection("article").update(myobj, mynewobj, function (err, response) {
            if (err)
                throw err;

            db.close();
        });

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end("Article updated");
    });
}

exports.deletearticle = function (req, res) {

    veriftoken.veriftoken(req, res)

    var body = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        slug = post.slug;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        var myobj = { slug: slug }

        dbo.collection("article").deleteOne(myobj, function (err, response) {
            if (err)
                throw err;

            db.close();
        });

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end("Article deleted");

    });
}

exports.publishcomments = function (req, res) {

    var body = '';
    var slug = '';
    var username = '';
    var content = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        article_slug = post.slug;
        username = post.username;
        content = post.content;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        var myobj = [
            {
                article_slug: article_slug,
                username: username,
                content: content
            }
        ]

        dbo.collection("comments").insert(myobj, function (err, response) {
            if (err)
                throw err;

            db.close();
        });

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end("Comment publicated");

    });

}

exports.deletecomments = function (req, res) {

    veriftoken.veriftoken(req, res)

    var body = '';
    var slug = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = qs.parse(body);
        article_slug = post.slug;
    });

    MongoClient.connect(urldb, { useUnifiedTopology: true }, function (err, db) {

        dbo = db.db("intronode")

        var myobj = { article_slug: article_slug }

        dbo.collection("comments").deleteOne(myobj, function (err, result) {
            if (err)
                throw err;

            db.close();
        });

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end("comment deleted");

    });

}

exports.testRequest = function (req, res) {
    body = ''

    req.on('data', function (chunk) {
        body += chunk
    })

    req.on('end', function () {

        postBody = JSON.parse(body)

        var response = {
            "text": "Post Request Value is  " + postBody.value
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(response))
    })
}

exports.invalidRequest = function (req, res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Invalid Request')
}