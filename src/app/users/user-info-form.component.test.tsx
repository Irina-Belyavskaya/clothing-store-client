import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "store"
import UserInfoForm from "./user-info-form.component"

it('should render UserInfoForm', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <UserInfoForm />
            </Provider>
        </BrowserRouter>
    )

})