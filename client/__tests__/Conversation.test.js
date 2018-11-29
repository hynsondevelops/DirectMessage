import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import ConversationsList from '../src/components/ConversationsList'
import ConversationsListContainer from '../src/container/ConversationsListContainer'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {userRegisterFailure} from '../src/actions'
import rootReducer from '../src/reducers/index.js';
import {createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import thunk from 'redux-thunk'
const loggerMiddleware = createLogger()



let conversationsArray = [{_id: 1}, {_id:2}]

describe('ConversationsList shallow', () => {

	let wrapper;

	beforeEach(()=>{
    	wrapper = shallow(<ConversationsList conversations={conversationsArray} />)
    })

	it('should renders the shallow component', () => {

		expect(wrapper.length).toEqual(1)
	})

    it('should display the conversations given', () => {
        expect(wrapper.contains(conversationsArray[0]._id)).toEqual(true)
    })
})


describe('ConversationsList with redux store',()=>{
    const initialState = {user : {conversations: conversationsArray}}
    const mockStore = configureStore()
    let store, container

    beforeEach(()=>{
        store = mockStore(initialState)
        container = shallow(<ConversationsListContainer store={store} /> )  
    })

    it('renders properly', () => {
       expect(container.length).toEqual(1)
    });

    it('sets props to state from store', () => {
       expect(container.prop('conversations')).toEqual(initialState.user.conversations)
    });
})

describe('ConversationsList with mount and provider',()=>{
	const initialState = {user : {conversations: conversationsArray}}
    const mockStore = configureStore()
    let store,wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><ConversationsListContainer /></Provider> )
    })


    it('renders the container properly', () => {
       expect(wrapper.find(ConversationsListContainer).length).toEqual(1)
    });

    it('sets props to state from store', () => {
       expect(wrapper.find(ConversationsList).prop('conversations')).toEqual(initialState.user.conversations)
    });
});
