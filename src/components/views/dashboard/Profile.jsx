import React from 'react'

export const Profile = () => {
    return (
        <div className="container">
            <form>
                <div className="form-group row">
                    <label htmlFor="nickname" className="col-4 col-form-label">Nickname</label>
                    <div className="col-8">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fa fa-user-circle-o"></i>
                                </div>
                            </div>
                            <input id="nickname" name="nickname" placeholder="Nickname" type="text" className="form-control"></input>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <i className="fa fa-user-circle-o"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-4 col-8">
                    </div>
                </div>
            </form>
        </div>

    )
}
