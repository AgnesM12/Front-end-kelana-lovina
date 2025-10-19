function Footer() {
    return (
    <footer>
        <div className="bg-primary py-12 text-center" >
            <h3 className="text-4xl mb-12 text-white">Kontak kami</h3>
            <ul className="flex flex-wrap justify-center items-center gap-12 text-xl text-white">
          <li className="flex items-center space-x-3">
            <img
              src="/ic_baseline-facebook.svg"
              alt="Facebook"
              className="w-8 h-8"
            />
            <span className="text-justify justify-start text-white text-xl font-medium">Kelana Lovina</span>
          </li>

          <li className="flex items-center space-x-3">
            <img
              src="/Group.svg"
              alt="Group"
              className="w-8 h-8"
            />
            <span className="text-justify justify-start text-white text-xl font-medium">@kelanalovina</span>
          </li>

          <li className="flex items-center space-x-3">
            <img
              src="/mdi_youtube.svg"
              alt="YouTube"
              className="w-8 h-8"
            />
            <span className="text-justify justify-start text-white text-xl font-medium">Kelana Lovina</span>
          </li>

          <li className="flex items-center space-x-3">
            <img
              src="/ic_baseline-whatsapp.svg"
              alt="WhatsApp"
              className="w-8 h-8"
            />
            <span className="text-justify justify-start text-white text-xl font-medium">0812938081209</span>
          </li>
        </ul>
            <div className="self-stretch h-0  outline-2 outline-offset-[-1px] border-t-2 mt-8 py-6items-center justify-center text-xl font-normal text-white">
              <p className="mt-2">Copyright © Kelana Lovina 2025. All Rights Reserved</p>
            </div>
            </div>
    </footer>
    );
}

export default Footer;