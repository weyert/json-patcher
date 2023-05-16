import test from 'ava'

import {applyPatch} from '..'

test('broken add', t => {
    const user = {id: 'chbrown'}
    const error = t.throws(() => {
        applyPatch(user, [
            {op: 'add', path: '/a/b', value: 1},
        ])
    })
        
    t.true(error.message.includes(`'/a/b': path is invalid`))
})

test('broken remove', t => {
    const user = {id: 'chbrown'}
    const error = t.throws(() => {
        applyPatch(user, [
            {op: 'remove', path: '/name'},
        ])
    })

        
    t.true(error.message.includes(`'/name': path is invalid`))

})

test('broken replace', t => {
    const user = {id: 'chbrown'}
    const error = t.throws(() => {
        applyPatch(user, [
            {op: 'replace', path: '/name', value: 1},
        ])
    })
        
    t.true(error.message.includes(`'/name': path is invalid`))

})

test('broken replace (array)', t => {
    const users = [{id: 'chbrown'}]
    const error = t.throws(() => {
        applyPatch(users, [
            {op: 'replace', path: '/1', value: {id: 'chbrown2'}},
        ])
    })
        
    t.true(error.message.includes(`'/1': path is invalid`))

})

test('broken move (from)', t => {
    const user = {id: 'chbrown'}
    const error = t.throws(() => {
        applyPatch(user, [
            {op: 'move', from: '/name', path: '/id'},
        ])
    })
        
    t.true(error.message.includes(`'/id': "from" path is invalid`))

})

test('broken move (path)', t => {
    const user = {id: 'chbrown'}
    const error = t.throws(() => {
        applyPatch(user, [
            {op: 'move', from: '/id', path: '/a/b'},
        ])
    })
        
    t.true(error.message.includes(`'/a/b': path is invalid`))

})

test('broken copy (from)', t => {
    const user = {id: 'chbrown'}
    const error = t.throws(() => {
        applyPatch(user, [
            {op: 'copy', from: '/name', path: '/id'},
        ])
    })
        
    t.true(error.message.includes(`'/id': "from" path is invalid`))

})

test('broken copy (path)', t => {
    const user = {id: 'chbrown'}
    const error = t.throws(() => {
        applyPatch(user, [
            {op: 'copy', from: '/id', path: '/a/b'},
        ])
    })
        
    t.true(error.message.includes(`'/a/b': path is invalid`))

})
