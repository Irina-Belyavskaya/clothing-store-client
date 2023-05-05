import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import Loading from "components/loading.component"
import { Provider } from "react-redux"
import { BrowserRouter, MemoryRouter, Router, useAsyncError } from "react-router-dom"
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import CategoryProducts from "./category-products.component"


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
    created: Number(new Date()),
    description: 'test',
    categoryId: 1

}
describe('category products', () => {

    it('should display loading', async () => {
        const initialState = {
            productsReducer: {
                products: [products],
                product: products,
                pending: {
                    products: true,
                    product: true
                },
                errors: {
                    products: '1',
                    product: '1'
                }
            }
        }
        let store = mockStore()
        store = mockStore(initialState)
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CategoryProducts categoryId={1} />
                </MemoryRouter>
            </Provider>
        )
        const text = await screen.findByText(/Loading.../i)
        expect(text).toBeInTheDocument()
    })

    it('should display no clothes in this category', async () => {
        const initialState = {
            productsReducer: {
                products: [],
                product: null,
                pending: {
                    products: false,
                    product: false
                },
                errors: {
                    products: false,
                    product: false
                }
            },
            userCartReducer: {
                errors: {
                    userCart: false,
                    productInCart: false
                }
            },
        }
        let store = mockStore()
        store = mockStore(initialState)
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CategoryProducts categoryId={1} />
                </MemoryRouter>
            </Provider>
        )
        const text = await screen.findByText(/No products in this category.../i)
            expect(text).toBeInTheDocument()
    })

    it('should display cards', async () => {
        const initialState = {
            productsReducer: {
                products: [products],
                product: products,
                pending: {
                    products: false,
                    product: false
                },
                errors: {
                    products: false,
                    product: false
                }
            },
            userCartReducer: {
                errors: {
                    userCart: false,
                    productInCart: false
                }
            },
        }
        let store = mockStore()
        store = mockStore(initialState)
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CategoryProducts categoryId={1} />
                </MemoryRouter>
            </Provider>
        )
        const text = await screen.findAllByTestId('cardProd')
        text.forEach(element => {
            expect(element).toBeInTheDocument()
        });
    })
    //     it('should display all table rows', async () => {
    //         const initialState = {
    //             userCartReducer: {
    //                 userCart: [userCart],
    //                 productInCart: {
    //                     productId: 'test',
    //                     quantity: 1
    //                 },
    //                 pending: {
    //                     userCart: false,
    //                     productInCart: false
    //                 },
    //                 errors: {
    //                     userCart: '1',
    //                     productInCart: '1'
    //                 }
    //             },
    //             userOrderReducer: {
    //                 orders: [{
    //                     products: [products],
    //                     totalPrice: 1,
    //                 }],
    //                 order: null,
    //                 pending: {
    //                     orders: false,
    //                     order: false,
    //                 },
    //                 errors: {
    //                     orders: ['1'],
    //                     order: '1'
    //                 }
    //             }
    //         }
    //         let store = mockStore()
    //         store = mockStore(initialState)
    //         render(
    //             <Provider store={store}>
    //                 <MemoryRouter>
    //                     <CartTable />
    //                 </MemoryRouter>
    //             </Provider>
    //         )
    //         const tbl = await screen.findAllByTestId('tblrow')
    //         tbl.forEach(i => {
    //             expect(i).toBeInTheDocument()
    //         });
    //     })

    // it('should display all table cells', async () => {
    //     const initialState = {
    //         userCartReducer: {
    //             userCart: [userCart],
    //             productInCart: {
    //                 productId: 'test',
    //                 quantity: 1
    //             },
    //             pending: {
    //                 userCart: false,
    //                 productInCart: false
    //             },
    //             errors: {
    //                 userCart: '1',
    //                 productInCart: '1'
    //             }
    //         },
    //         userOrderReducer: {
    //             orders: [{
    //                 products: [products],
    //                 totalPrice: 1,
    //             }],
    //             order: null,
    //             pending: {
    //                 orders: false,
    //                 order: false,
    //             },
    //             errors: {
    //                 orders: ['1'],
    //                 order: '1'
    //             }
    //         }
    //     }
    //     let store = mockStore()
    //     store = mockStore(initialState)
    //     render(
    //         <BrowserRouter>
    //             <Provider store={store}>
    //                 <CartTable />
    //             </Provider>
    //         </BrowserRouter>
    //     )
    //     const text = await screen.findAllByTestId('cell')
    //     text.forEach(i => {
    //         expect(i).toBeInTheDocument()
    //     });
    // })

    // it('should addQuantity', async () => {
    //     let initialState = {
    //         userCartReducer: {
    //             userCart: [userCart],
    //             productInCart: {
    //                 productId: 'test',
    //                 quantity: 1
    //             },
    //             pending: {
    //                 userCart: false,
    //                 productInCart: false
    //             },
    //             errors: {
    //                 userCart: '1',
    //                 productInCart: '1'
    //             }
    //         },
    //         userOrderReducer: {
    //             orders: [{
    //                 products: [products],
    //                 totalPrice: 1,
    //             }],
    //             order: null,
    //             pending: {
    //                 orders: false,
    //                 order: false,
    //             },
    //             errors: {
    //                 orders: ['1'],
    //                 order: '1'
    //             }
    //         }
    //     }
    //     let store = mockStore()
    //     store = mockStore(initialState)
    //     render(
    //         <BrowserRouter>
    //             <Provider store={store}>
    //                 <CartTable />
    //             </Provider>
    //         </BrowserRouter>
    //     )
    //     const text = await screen.findByTestId('addQuantity')
    //     // fireEvent.click(text)
    //     // const result = renderHook((store) => useUserCartSelector())
    //     expect(text).toBeInTheDocument()
    // })
})