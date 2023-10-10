import React from 'react'

function FooterPDF() {
    return (
        <>
            <footer >
                <hr className="w-full mt-1 border-t-4 border-black" />
                <div className="text-sm pl-3 pt-2">
                    <p className="font-medium">PP Ontime Company Limited</p>
                    <p>1011 Supalai Grand Tower, 16 Floor, Rama 3 Rd., Chong Nonsi, Yannawa, Bangkok. 10120</p>
                    <div className="flex gap-4">
                        <p className="font-medium">Tel : <span className="font-normal"> 02-0562099 ( Auto ) </span></p>
                        <p className="font-medium">Fax : <span className="font-normal">02-0562088 </span></p>
                        <p className="font-medium">mail : <span className="font-normal"> n.o.c @pp-ontime.co.th </span></p>
                        <p className="font-medium">Web Site : <span className="font-normal">www.pp-ontime.co.th</span></p>
                    </div>
                    <p className="font-medium">Copyright ‘2008 PPOntime Company Limited.A Computer & Telecom Solution Company</p>
                </div>
            </footer>
        </>
    )
}

export default FooterPDF;