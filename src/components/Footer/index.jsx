import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DiliFood from '../../assets/image/logo.png';
import {faFacebook, faFacebookMessenger, faSquareInstagram, faTiktok} from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return ( 
        <div className="w-full h-auto grid md:grid-cols-3 lg:grid-cols-4 gap-[2rem] px-[2rem] md:px-[5rem] lg:px-[10rem] py-[4rem] bg-[#2e2e2ed2] mt-[6rem]">
            <div className="pt-[1rem]">
                <img src={DiliFood} alt="booking care" className="w-[20rem] h-[8rem]"/>
                <p className="text-[1.6rem] text-white pt-[1rem]">Nhà hàng với nhiều dịch vụ và món ăn đa dạng, giúp khách hàng tận hưởng những những phút giây thuyệt vời!</p>
            </div>
            <div className="text-white">
                <p className="py-[1rem] hover:text-[#9aff9a] hv-linear cursor-pointer">Địa chỉ: đường số 5, KDC Thạnh Mỹ, Q.Cái Răng, Tp.Cần Thơ</p>
                <p className="py-[1rem] hover:text-[#9aff9a] hv-linear cursor-pointer">Hotline: 0357124853</p>
                <p className="py-[1rem] hover:text-[#9aff9a] hv-linear cursor-pointer">Email: nguyentrungkien040921@gmail.com</p>
            </div>
            <div className="text-white">
                <a href="#" className="py-[1rem] block pt-[1rem]">Chính sách bảo mật</a>
                <a href="#" className="py-[1rem] block pt-[1rem]">Điều khoảng dịch vụ</a>
            </div>
            <div className="relative flex gap-[1.5rem] pt-[1rem] before:content before:absolute before:w-full before:h-[.3rem] before:bg-[cyan] before:top-[6rem]">
                <FontAwesomeIcon icon={faFacebook} className="text-[3.5rem] text-white hover:text-[cyan] transition-colors duration-[.25s]"/>
                <FontAwesomeIcon icon={faFacebookMessenger} className="text-[3.5rem] text-white hover:text-[cyan] transition-colors duration-[.25s]"/>
                <FontAwesomeIcon icon={faSquareInstagram} className="text-[3.5rem] text-white hover:text-[cyan] transition-colors duration-[.25s]"/>
                <FontAwesomeIcon icon={faTiktok} className="text-[3.5rem] text-white hover:text-[cyan] transition-colors duration-[.25s]"/>
            </div>
        </div>
     );
}

export default Footer;