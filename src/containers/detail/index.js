import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnimeDetail } from '../../store/actions/anime';
import Layout from '../../components/layout';
import { Link } from 'react-router-dom';
import styles from './detail.less'

class Detail extends Component {
  state = {
    hasError: false,
	}

  componentDidMount(){
    const { params } = this.props.match
		this.props.getAnimeDetail(params)
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    // 在这里可以做异常的上报
    console.log('发送错误', error, info)
  }
  render(){
    const { detailInfo } = this.props
    return (
      <Layout title={ detailInfo.name } description="anime body" keywords="anime, acg">
        { detailInfo.name }
        <Link className={styles.link} to='/anime'>Anime</Link>
      </Layout>
    )
  }
}

const mapStateToProps = ({ detailInfo }) => ({
  detailInfo,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAnimeDetail,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
