import React from 'react';
import {Link} from "react-router-dom";
// import useForm from "../formHook";

const Test = function () {


    return (
        <div class="container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 className="panel-title">
                        List of to-do items &nbsp;
                        <button className="btn btn-primary" >Logout</button>
                        }
                    </h3>
                </div>
                <div class="panel-body">

                    <table class="table table-stripe">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start time</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Link to={`/show/`}></Link></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Test;
