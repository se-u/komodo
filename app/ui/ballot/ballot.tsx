import style from './ballot.module.css';

export default function Ballot() {
    return (
        <div className={style['ballot-bg']}>
            <div className="mb-4 text-center">
                <h1 className="text-4xl font-bold text-[#012169] border-b-[5px] inline border-[#F0B323]">Voting Sistem</h1>
                <h3 className="pt-3 text-xl font-medium text-[#012169]">Silahkan pilih jagoanmu !</h3>
                <p className="">
                    Klik, Pilih Aman. Demokrasi Milenial
                </p>
            </div>

            <div className={style['row']}>
                <div className={style['card']}>
                    <input
                        type="radio"
                        name="card-option"
                        className={style['card-radio']}
                        id="option2"
                    />
                    <label htmlFor="option2" className={style['card-label']}>
                        Azriel Sebastian Pamungkas
                    </label>
                </div>
                <div className={style['card']}>
                    <input
                        type="radio"
                        name="card-option"
                        className={style['card-radio']}
                        id="option1"
                    />
                    <label htmlFor="option1" className={style['card-label']}>
                        Sindu Aditya Janadi
                    </label>
                </div>
                <div className={style['card']}>
                    <input
                        type="radio"
                        name="card-option"
                        className={style['card-radio']}
                        id="option3"
                    />
                    <label htmlFor="option3" className={style['card-label']}>
                        Jovan Santosa
                    </label>
                </div>
            </div>
        </div>
    );
}
