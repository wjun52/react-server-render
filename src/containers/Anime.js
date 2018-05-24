import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnime } from '../store/actions/anime';
import Layout from '../components/layout';
import { Link } from 'react-router-dom';

class Anime extends Component{
  state = {
    hasError: false,
    weekEng: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    weekDay: new Date().getDay() - 1,
    weekCn: ['一', '二', '三', '四', '五', '六', '日'],
	}

  componentDidMount(){
		this.props.getAnime()
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    // 在这里可以做异常的上报
    console.log('发送错误', error, info)
  }
  render(){
    const { weekDay, weekCn, weekEng } = this.state
    const { animeInfo } = this.props;
    return (
      <Layout title="My Anime" description="anime body" keywords="anime, acg">
        {
					weekCn.map((week, index) => <li key={week}>{week}
						{
							(animeInfo[weekEng[index]] || []).map(item => <Link key={item.id} to={`/anime/${item.id}`}>{item.title}</Link>)
						}
					</li>)
        }
        <Link to='/user'>User</Link>
      </Layout>
    )
  }
}

const mapStateToProps = ({ animeInfo }) => ({
  animeInfo,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAnime,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Anime)
