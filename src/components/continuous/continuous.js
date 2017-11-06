import React from 'react';
import _ from "lodash";
// import cells from "../../../data/GBM_metadata.js";
import drawParallelCoordinates from "./drawParallelCoordinates";
import drawAxes from "./drawAxes";
import setupParallelCoordinates from "./setupParallelCoordinates";
import styles from './parallelCoordinates.css';
import SectionHeader from "../framework/sectionHeader";
import { connect } from "react-redux";

import {
  margin,
  width,
  height,
  innerHeight,
  color,
  createDimensions,
  types,
  xscale,
  yAxis,
} from "./util";

@connect((state) => {

  const ranges = state.cells.cells && state.cells.cells.data.ranges ? state.cells.cells.data.ranges : null;
  const metadata = state.cells.cells && state.cells.cells.data.metadata ? state.cells.cells.data.metadata : null;

  return {
    ranges,
    metadata,
  }
})
class Continuous extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      svg: null,
      ctx: null,
      axes: null,
      parallelExists: false,
      dimensions: null,
    };
  }

  componentDidMount() {
    const {svg, ctx} = setupParallelCoordinates(
      width,
      height,
      margin
    );
    this.setState({svg, ctx})
  }

  componentWillReceiveProps(nextProps) {




    if (
      nextProps.ranges &&
      !this.state.parallelExists
    ) {
      const dimensions = createDimensions(nextProps.ranges);
      const axes = drawAxes(
        this.state.svg,
        dimensions,
        xscale
      )
      drawParallelCoordinates(
        nextProps.metadata,
        dimensions,
        this.state.ctx,
        xscale,
        width,
        height,
        margin
      )
      this.setState({
        parallelExists: true,
        dimensions,
        axes,
      })
    }
  }

  render() {

    return (
      <div id="parcoords_wrapper" style={{marginTop: 50}}>
        <SectionHeader text="Continuous Metadata"/>
        <div
          className={styles.parcoords}
          id="parcoords"
          style={{
            width:  width + margin.left + margin.right + "px",
            height: height + margin.top + margin.bottom + "px"
          }}></div>
      </div>
    )
  }
};

export default Continuous;

/* text appended to parellel coords giving N instances of selection */
// <pre id="parcoords_output" className={styles.pre}></pre>
// var output = d3.select("#parcoords_output");

/*

<div style={{marginBottom: 30}}>
  Color By:
  <button style={{marginLeft: 10}}>Cluster_2d_color</button>
  <button style={{marginLeft: 10}}>Cluster_CNV_color</button>
  <button style={{marginLeft: 10}}>Location.color</button>
  <button style={{marginLeft: 10}}>Sample.name.color</button>
  <button style={{marginLeft: 10}}>Sample.type.color</button>
  <button style={{marginLeft: 10}}>Selection.color</button>
  <button style={{marginLeft: 10}}>housekeeping_cluster_color</button>
  <button style={{marginLeft: 10}}>recluster_myeloid</button>
  <button style={{marginLeft: 10}}>recluster_myeloid_color</button>
</div>


*/
