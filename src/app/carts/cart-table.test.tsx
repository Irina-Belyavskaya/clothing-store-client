import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter, MemoryRouter, Router, useAsyncError } from "react-router-dom"
import CartTable from "./cart-table"
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import { UserCartStateType } from './types/user-cart-state.type'
import { CartDtoType } from "./types/cart-dto.type"
import { UserProductDtoType } from './types/user-product-dto.type'
import { useUserCartSelector } from "./store/cart.selectors"
import { useAppDispatch } from "hooks/redux"


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const products = {
    name: 'test',
    image: '/url',
    brand: 'test',
    price: 1,
    quantity: 1,
    id: 'test',
    updated: Number(new Date()),
    created: Number(new Date())

}
const userCart = {
    products: products,
    quantity: 1,
    id: 'test',
    updated: Number(new Date()),
    created: Number(new Date())
}
describe('cart table', () => {

    it('should display total price', () => {
        const initialState = {
            userCartReducer: {
                userCart: [userCart],
                productInCart: {
                    productId: 'test',
                    quantity: 1
                },
                pending: {
                    userCart: false,
                    productInCart: false
                },
                errors: {
                    userCart: '1',
                    productInCart: '1'
                }
            },
            userOrderReducer: {
                orders: [{
                    products: [products],
                    totalPrice: 1,
                }],
                order: null,
                pending: {
                    orders: false,
                    order: false,
                },
                errors: {
                    orders: ['1'],
                    order: '1'
                }
            }
        }
        let store = mockStore()
        store = mockStore(initialState)
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CartTable />
                </MemoryRouter>
            </Provider>
        )
        const text = screen.getByText(/Total price:/i)
        expect(text).toBeInTheDocument()
    }),

        it('should display all table rows', async () => {
            const initialState = {
                userCartReducer: {
                    userCart: [userCart],
                    productInCart: {
                        productId: 'test',
                        quantity: 1
                    },
                    pending: {
                        userCart: false,
                        productInCart: false
                    },
                    errors: {
                        userCart: '1',
                        productInCart: '1'
                    }
                },
                userOrderReducer: {
                    orders: [{
                        products: [products],
                        totalPrice: 1,
                    }],
                    order: null,
                    pending: {
                        orders: false,
                        order: false,
                    },
                    errors: {
                        orders: ['1'],
                        order: '1'
                    }
                }
            }
            let store = mockStore()
            store = mockStore(initialState)
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <CartTable />
                    </MemoryRouter>
                </Provider>
            )
            const tbl = await screen.findAllByTestId('tblrow')
            tbl.forEach(i => {
                expect(i).toBeInTheDocument()
            });
        })

    it('should display all table cells', async () => {
        const initialState = {
            userCartReducer: {
                userCart: [userCart],
                productInCart: {
                    productId: 'test',
                    quantity: 1
                },
                pending: {
                    userCart: false,
                    productInCart: false
                },
                errors: {
                    userCart: '1',
                    productInCart: '1'
                }
            },
            userOrderReducer: {
                orders: [{
                    products: [products],
                    totalPrice: 1,
                }],
                order: null,
                pending: {
                    orders: false,
                    order: false,
                },
                errors: {
                    orders: ['1'],
                    order: '1'
                }
            }
        }
        let store = mockStore()
        store = mockStore(initialState)
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <CartTable />
                </Provider>
            </BrowserRouter>
        )
        const text = await screen.findAllByTestId('cell')
        text.forEach(i => {
            expect(i).toBeInTheDocument()
        });
    })

    it('should addQuantity', async () => {
        let initialState = {
            userCartReducer: {
                userCart: [userCart],
                productInCart: {
                    productId: 'test',
                    quantity: 1
                },
                pending: {
                    userCart: false,
                    productInCart: false
                },
                errors: {
                    userCart: '1',
                    productInCart: '1'
                }
            },
            userOrderReducer: {
                orders: [{
                    products: [products],
                    totalPrice: 1,
                }],
                order: null,
                pending: {
                    orders: false,
                    order: false,
                },
                errors: {
                    orders: ['1'],
                    order: '1'
                }
            }
        }
        let store = mockStore()
        store = mockStore(initialState)
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <CartTable />
                </Provider>
            </BrowserRouter>
        )
        const text = await screen.findByTestId('addQuantity')

        // fireEvent.click(text)
        // const result = useAppDispatch()
        // const result = renderHook((store) => useUserCartSelector())
        expect(text).toBeInTheDocument()
    })
})