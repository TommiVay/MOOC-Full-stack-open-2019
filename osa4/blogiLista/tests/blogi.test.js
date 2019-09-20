const listHelper = require('../utils/list_helper')
const testhelper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const mongoose = require('mongoose')

beforeEach(async () => {
    await Blog.remove({})

    for (let blog of testhelper.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

test('mostblogs', () => {
    expect(listHelper.mostBlogs(testhelper.blogs)).toEqual({
        author: "Robert C. Martin",
        blogs: 3
      })
})

test('mostLikes', () => {
    expect(listHelper.mostLikes(testhelper.blogs)).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17
      })
})

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(testhelper.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list is empty equals 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has multiple blogs equals the likes of those', () => {
        const result = listHelper.totalLikes(testhelper.blogs)
        expect(result).toBe(36)
    })
})

describe('Most liked', () => {
    test('when list has multiple blogs equals blog with 12 likes', () => {
        const result = listHelper.favoriteBlog(testhelper.blogs)
        expect(result).toEqual(testhelper.blogs[2])
    })

    test('when list is empty equals null', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(null)
    })

    test('when list has one blog equals the same blog', () => {
        const result = listHelper.favoriteBlog(testhelper.listWithOneBlog)
        expect(result).toEqual(testhelper.listWithOneBlog[0])
    })
})

describe('blog API tests', () => {
    test('all notes are returned as json', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(testhelper.blogs.length)
    })

    test('Blogs are indentified by id', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        for (let blog of blogs) {
            expect(blog.id).toBeDefined()
        }
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            _id: '5a422aa71b54a676234d17f1',
            title: 'titleasd',
            author: 'test',
            url: 'test.org',
            likes: 5,
            __v: 0
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        const blogsDb = await testhelper.blogsInDb()
        expect(blogsDb.length).toBe(testhelper.blogs.length + 1)

        const titles = blogsDb.map(b => b.title)
        expect(titles).toContain(newBlog.title)
    })

    test('If likes value is null, it will be set as 0', async () => {
        const newBlog = {
            _id: '5a422aa71b54a676234d17f1',
            title: 'titleasd',
            author: 'test',
            url: 'test.org',
            likes: null,
            __v: 0
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        expect(response.body.likes).toBe(0)

    })

    test('If new blog does not contain title and url attributes respond is 400', async () => {
        const newBlog = {
            _id: '5a422aa71b54a676234d17f1',
            title: 'titleasd',
            author: 'test',
            likes: 1,
            __v: 0
        }
        const newBlog1 = {
            _id: '5a422aa71b54a676234d17f1',
            author: 'test',
            likes: null,
            __v: 0
        }
        const newBlog2 = {
            _id: '5a422aa71b54a676234d17f1',
            author: 'test',
            url: "asd.org",
            likes: null,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(newBlog1)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(newBlog2)
            .expect(400)
    })

    test('deletion of a note', async () => {
        const blogsAtStart = await testhelper.blogsInDb()
        const toDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${toDelete.id}`)
            .expect(204)

        const blogsAtEnd = await testhelper.blogsInDb()
        expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

        const titles = blogsAtEnd.map(b => b.title)

        expect(titles).not.toContain(toDelete.title)
    })

    test('likes can be updated', async () => {
        let blogsDb = await testhelper.blogsInDb()
        const likes = {
            likes: 10
        }

        await api
            .put(`/api/blogs/${blogsDb[0].id}`)
            .send(likes)


        blogsDb = await testhelper.blogsInDb()

        expect(blogsDb[0].likes).toBe(10)
    })

})

describe('user API tests', () => {
    describe('user validation', () => {
        test('user with no username should not be added', async () => {
            const usersAtStart = await testhelper.usersInDb()
            const user = {
                username: "",
                name: "testiia",
                password: "asds"
            }

           const res =  await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            
            expect(res.body.error).toBe("User validation failed: username: Path `username` is required.")

            const usersAtEnd = await testhelper.usersInDb()

            expect(usersAtStart.length).toBe(usersAtEnd.length)

        })

        test('user with username shorter than 3 chars should not be added', async () => {
            const usersAtStart = await testhelper.usersInDb()
            const user = {
                username: "aa",
                name: "testiia",
                password: "asdds"
            }

           const res =  await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            
            expect(res.body.error).toBe("User validation failed: username: Path `username` (`aa`) is shorter than the minimum allowed length (3).")

            const usersAtEnd = await testhelper.usersInDb()

            expect(usersAtStart.length).toBe(usersAtEnd.length)

        })

        test('user with password shorter than 3 chars should not be added', async () => {
            const usersAtStart = await testhelper.usersInDb()
            const user = {
                username: "aqea",
                name: "testiia",
                password: "as"
            }

           const res =  await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            
            expect(res.body.error).toBe('password too short (min lenght 3) or missing')

            const usersAtEnd = await testhelper.usersInDb()

            expect(usersAtStart.length).toBe(usersAtEnd.length)

        })

        test('user with password missing should not be added', async () => {
            const usersAtStart = await testhelper.usersInDb()
            const user = {
                username: "aqea",
                name: "testiia",
                password: ""
            }

           const res =  await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            
            expect(res.body.error).toBe('password too short (min lenght 3) or missing')

            const usersAtEnd = await testhelper.usersInDb()

            expect(usersAtStart.length).toBe(usersAtEnd.length)

        })

        test('username should be unique', async () => {
            const usersAtStart = await testhelper.usersInDb()
            const user = {
                username: usersAtStart[0].name,
                name: "testiia",
                password: "12335"
            }

           const res =  await api
            .post('/api/users/')
            .send(user)
            .expect(400)
            
            expect(res.body.error).toBe("User validation failed: username: Error, expected `username` to be unique. Value: `".concat(usersAtStart[0].name).concat("`"))

            const usersAtEnd = await testhelper.usersInDb()

            expect(usersAtStart.length).toBe(usersAtEnd.length)

        })
    })
})


afterAll(() => {
    mongoose.connection.close()
})

