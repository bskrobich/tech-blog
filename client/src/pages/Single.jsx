import React from 'react';
import Edit from '../images/edit.png'
import Delete from '../images/delete.png'
import {Link} from "react-router";
import Menu from "../components/Menu.jsx";

function Single() {
    return (
        <div className="single">
            <div className="container">
                <div className="content">
                    <img
                        src="https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1334/750x500/filters:focal(1020x667:1021x668):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25334825/STK466_ELECTION_2024_CVirginia_E.jpg"
                        alt=""/>
                    <div className="group-container">
                        <div className="user">
                            <span><b>Bartosz S.</b></span>
                            <p>Posted 3 days ago</p>
                        </div>
                        <div className="edit">
                            <Link to="/write?edit=1">
                                <img src={Edit} alt="Edit"/>
                            </Link>
                            <img src={Delete} alt="Delete"/>
                        </div>
                    </div>
                    <h1>
                        Trump asks the Supreme Court to let him rescue TikTok
                    </h1>
                    <p>
                        President-elect Donald Trump is asking the Supreme Court to let him negotiate a deal to save TikTok from an imminent US ban.
                        <br/><br/>
                        In an amicus brief filed to the court, Trump says he “seeks the ability to resolve the issues at hand through political means once he takes office,” and that he “alone possesses the consummate dealmaking expertise, the electoral mandate, and the political will to negotiate a resolution to save the platform.”
                        <br/><br/>
                        Last week, the Supreme Court agreed to hear arguments that a bill passed by Congress banning TikTok on national security grounds violates the First Amendment. The bill gives wide latitude to the president to delay its enforcement if there’s progress being made towards a deal that ensures TikTok isn’t fully controlled by its Chinese parent company, ByteDance.
                    </p>
                </div>
                <div className="menu">
                    <Menu />
                </div>
            </div>
            <div className="comments">
                comments section
            </div>
        </div>
    );
}

export default Single;