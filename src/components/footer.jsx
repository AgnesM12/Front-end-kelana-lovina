function Footer() {
    return (
    <footer>
        <div className="bg-primary py-12 text-center px-4 sm:px-8" >
            <h3 className="text-3xl sm:text-4xl mb-12 text-white font-semibold tracking-wide">Kontak kami</h3>
            <ul className="flex flex-wrap lg:justify-center items-center gap-6 lg:gap-12 text-lg sm:text-xl text-white max-w-[1000px] mx-auto">
          <li className="flex items-center space-x-3 w-[45%] lg:w-auto justify-center">
            <img
              src="/ic_baseline-facebook.svg"
              alt="Facebook"
              className="w-8 h-8"
            />
            <span className=" font-medium">Kelana Lovina</span>
          </li>

          <li className="flex items-center space-x-3 w-[45%] lg:w-auto justify-center">
            <img
              src="/Group.svg"
              alt="Group"
              className="w-8 h-8"
            />
            <span className="font-medium">@kelanalovina</span>
          </li>

          <li className="flex items-center space-x-3 w-[45%] lg:w-auto justify-center">
            <img
              src="/mdi_youtube.svg"
              alt="YouTube"
              className="w-8 h-8"
            />
            <span className="font-medium">Kelana Lovina</span>
          </li>

          <li className="flex items-center space-x-3 w-[45%] lg:w-auto justify-center">
            <img
              src="/ic_baseline-whatsapp.svg"
              alt="WhatsApp"
              className="w-8 h-8"
            />
            <span className="font-medium">0812938081209</span>
          </li>
        </ul>
            <div className="self-stretch h-0  outline-2 outline-offset-[-1px] border-t-2 mt-8 py-6 items-center justify-center text-lg sm:text-xl font-medium text-white">
              <p className="mt-2">Copyright © Kelana Lovina 2025. All Rights Reserved</p>
            </div>
            </div>
    </footer>
    );
}

export default Footer;