import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Alert from '../src/components/Alert'
import AlertContainer from '../src/container/AlertContainer'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {userRegisterFailure} from '../src/actions'
import rootReducer from '../src/reducers/index.js';
import {createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import thunk from 'redux-thunk'
const loggerMiddleware = createLogger()



let alertText = "Alert text"

describe('Alert shallow', () => {

	let wrapper;

	beforeEach(()=>{
    	wrapper = shallow(<Alert />)
    })

	it('should renders the shallow component', () => {

		expect(wrapper.length).toEqual(1)
	})

	it('should be null if no alert given', () => {
		expect(wrapper.type()).toEqual(null)
	})

	it('should display the alert given', () => {
		wrapper = shallow(<Alert alerts={alertText} />)
		expect(wrapper.contains(alertText)).toEqual(true)
	})

	

})


describe('Alert with redux store',()=>{
    const initialState = {alerts : alertText}
    const mockStore = configureStore()
    let store, container

    beforeEach(()=>{
        store = mockStore(initialState)
        container = shallow(<AlertContainer store={store} /> )  
    })

    it('renders properly', () => {
       expect(container.length).toEqual(1)
    });

    it('sets props to state from store', () => {
       expect(container.prop('alerts')).toEqual(initialState.alerts)
    });
})

describe('Alert with mount and provider',()=>{
	const initialState = {alerts : null}
    const mockStore = configureStore()
    let store,wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><AlertContainer /></Provider> )
    })


    it('renders the container properly', () => {
       expect(wrapper.find(AlertContainer).length).toEqual(1)
    });

    it('sets props to state from store', () => {
       expect(wrapper.find(Alert).prop('alerts')).toEqual(initialState.alerts)
    });


});
