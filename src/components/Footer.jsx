import DateUtils from "../utils/DateUtils";

function Footer() {
    return (
        <div className="p-5 text-center">
            <p className="font-semibold text-lg">&copy; Copyright {new DateUtils().currentYear()} Music App.</p>
        </div>
    );
}

export default Footer;