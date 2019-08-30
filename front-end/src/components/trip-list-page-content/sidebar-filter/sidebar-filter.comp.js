import React, { Component } from 'react';
import { Select, Icon, DatePicker, InputNumber } from 'antd';
import moment from "moment";
import { connect } from "react-redux";
import { changeSearchValue } from "../../../actions/search-action";
import "./sidebar-filter.css";
import places from "../../../constants/places-data";

const Option = Select.Option;

class SidebarFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationFrom: undefined,
            locationTo: undefined,
            startTime: new Date(),
            availableSeats: 1
        }
    }

    renderOptions = () => {
        return places.sort((a, b) => a.value.localeCompare(b.value)).map((place, index) => {
            return <Option value={place.value} key={index}>{place.label}</Option>
        })
    }

    componentWillReceiveProps(nextProps) {
        const { locationTo, locationFrom, startTime, availableSeats } = nextProps.searchValue;
        if (locationFrom === "" && locationTo === "") {
            this.setState({
                startTime,
                availableSeats
            })
        }
        else {
            this.setState({
                locationFrom,
                locationTo,
                startTime,
                availableSeats
            })
        }
    }


    handleOnChange = (key, value) => {
        this.setState({
            [key]: value
        }, () => {
            const { locationFrom, locationTo, startTime, availableSeats } = this.state;
            this.props.onChangeSearchValue(locationFrom, locationTo, new Date(startTime), availableSeats);
        })
    }

    handleChangeLocationForm = (e) => {
        this.handleOnChange("locationFrom", e);
    }

    handleChangeLocationTo = (e) => {
        this.handleOnChange("locationTo", e);
    }

    handleOnChangeSeat = (e) => {
        this.handleOnChange("availableSeats", e);
    }

    handleOnChangeStartDate = (e) => {
        this.handleOnChange("startTime", e);
    }



    render() {
        const { locationFrom, locationTo, startTime, availableSeats } = this.state;
        return (
            <div className="sidebar-filter box-wrapper">
                <h5 className="mb-3"><Icon type="filter" theme="twoTone" twoToneColor="#26ABED" /> Bộ lọc: </h5>
                <Select
                    className="rounded-left"
                    showSearch
                    placeholder="Nơi đi"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    name="locationFrom"
                    size="large"
                    suffixIcon={<Icon type="environment" theme="twoTone" twoToneColor="#2bc71f" />}
                    onChange={this.handleChangeLocationForm}
                    value={locationFrom}
                >
                    {this.renderOptions()}
                </Select>

                <Select
                    showSearch
                    placeholder="Nơi đến"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    name="locationTo"
                    size="large"
                    suffixIcon={<Icon type="environment" theme="twoTone" twoToneColor="#F95F48" />}
                    value={locationTo}
                    onChange={this.handleChangeLocationTo}
                >
                    {this.renderOptions()}
                </Select>

                <DatePicker size="large" name="startTime"
                    value={moment(startTime, 'DD/MM/YYYY')}
                    onChange={this.handleOnChangeStartDate}
                />

                <InputNumber min={1} max={10} defaultValue={1} size="large"
                    formatter={value => `${value} chỗ`}
                    name="numberOfSeats"
                    value={availableSeats}
                    onChange={this.handleOnChangeSeat}
                />

                <button className="btn-xedike btn btn-block"><i className="fa fa-search"></i> Tìm kiếm</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchValue: state.searchValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeSearchValue: (locationFrom, locationTo, startTime, availableSeats) => {
            dispatch(changeSearchValue(locationFrom, locationTo, startTime, availableSeats));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarFilter);