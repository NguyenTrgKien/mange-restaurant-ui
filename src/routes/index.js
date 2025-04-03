import HomePage from "../pages/HomePage";
// import Test from "../components/Test";
import LoginUser from "../pages/LoginUser";
import Manage from "../pages/Manage";
import SupperAdmin from "../pages/SupperAdmin";
import CategoryPage from "../pages/CategoryPage";
import CartView from "../pages/CartView";
import PaymentDish from "../pages/PaymentDish";
import PaymentSuccess from "../pages/PaymentSuccess";
import RedirectIfPayment from "../components/PaymentRedirect";
import OrderTable from "../pages/OrderTable";
import PaymentDishTable from "../pages/PaymentDishTable";
import PaymentResult from "../pages/PaymentResult";
import PaymentFail from "../pages/PaymentFail";
import InfoUserOrder from "../pages/InfoUserOrder";
import Introduce from "../pages/Introduce";
import Contact from "../pages/Contact";
import DetailOrder from "../pages/DetailOrder";
import DetailFood from "../pages/DetailFood";

const initRoutes = [
    {
        path: '/',
        element: HomePage 
    },
    {
        path: '/login',
        element: LoginUser  
    },
    {
        path: '/manage',
        element: Manage
    },
    {
        path: '/supperAdmin',
        element: SupperAdmin
    },
    {
        path: '/category-dish',
        element: CategoryPage
    },
    {
        path: '/detail-food',
        element: DetailFood
    },
    {
        path: '/payment-dish',
        element: PaymentDish
    },
    {
        path: '/cart-view',
        element: CartView
    },
    {
        path: '/payment-success',
        element: PaymentSuccess
    },
    {
        path: '/detail-order',
        element: DetailOrder
    },
    {
        path: '/payment-fail',
        element: PaymentFail
    },
    {
        path: '/order-table',
        element: OrderTable
    },
    {
        path: '/payment-dish-table',
        element: PaymentDishTable
    },
    {
        path: '/payment-result',
        element: PaymentResult
    },
    {
        path: '/info-user-order',
        element: InfoUserOrder
    },
    {
        path: '/about',
        element: Introduce
    },
    {
        path: '/contact',
        element: Contact
    },
    {
        path: '*',
        element: RedirectIfPayment
    }
];

export default initRoutes;