import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MainCategories from 'app/main/main-categories.component';
import { MemoryRouter } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('MainCategories', () => {
    it('renders without crashing', () => {
        const initialState = {
            categoryReducer: {
                categories: [{
                    name: 'divan',
                    description: 'super divan',
                    image: '/aefse'
                },
                    {
                        name: 'divan2',
                        description: 'super divan2',
                        image: '/aefse'
                    },
                    {
                        name: 'divan3',
                        description: 'super divan3',
                        image: '/aefse'
                    }

                ],
                category: null,
                pending: {
                    categories: false,
                    category: false
                },
                errors: {
                    categories: null,
                    category: null
                }
            },
        };
        let store: any = mockStore();
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MainCategories />
                </MemoryRouter>
            </Provider>,
        );
        expect(screen.getByText('For all tastes and all desires')).toBeInTheDocument();
    });

    it('displays a loader when roles are being fetched', () => {
            const initialState = {
                categoryReducer: {
                    categories: [{
                        name: 'divan',
                        description: 'super divan',
                        image: '/aefse'
                    },
                        {
                            name: 'divan2',
                            description: 'super divan2',
                            image: '/aefse'
                        },
                        {
                            name: 'divan3',
                            description: 'super divan3',
                            image: '/aefse'
                        }

                    ],
                    category: null,
                    pending: {
                        categories: true,
                        category: true
                    },
                    errors: {
                        categories: null,
                        category: null
                    }
                },
            };
            let store: any = mockStore();
        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MainCategories />
                </MemoryRouter>
            </Provider>,
        );
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

});
