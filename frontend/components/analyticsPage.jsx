var React = require('react');
var RadarChart = require('react-chartjs').Radar;
var LineChart = require("react-chartjs").Line;
var DonutChart = require("react-chartjs").Doughnut;

var SubscriptionStore = require('../stores/subscription.js');
var ReviewStore = require('../stores/review.js');

var ReviewsRadarChart = require('./reviewsRadarChart.jsx');
var HorizontalBarChart = require('./horizontalBarChart.jsx');

var AnalyticsPage = React.createClass({
  getInitialState: function() {
    return {
      reviews: ReviewStore.all(),
      subscriptions: SubscriptionStore.all()
    };
  },
  componentDidMount: function() {
    this.subscriptionListenerToken = SubscriptionStore.addListener(this.onSubscriptionChange);
    this.reviewListenerToken = ReviewStore.addListener(this.onReviewChange);
  },
  componentWillUnmount: function() {
    this.subscriptionListenerToken.remove();
    this.reviewListenerToken.remove();
  },

  onSubscriptionChange: function() {
    this.setState({
      subscriptions: SubscriptionStore.all()
    });
  },
  onReviewChange: function() {
    this.setState({
      reviews: ReviewStore.all()
    });
  },

  render: function() {
    if (this.state.subscriptions === undefined || this.state.reviews === undefined ||
      this.state.subscriptions.length === 0 || this.state.reviews.length === 0) {
        return <div className="container">
          <div className="jawn"></div>
        </div>;
    } else {
      var radarData = {};
      var labels = [];
      var avgUsage = {};
      var avgRating = {};
      var dailyUsageData = [];
      var weeklyUsageData = [];
      var monthlyUsageData = [];
      var yearlyUsageData = [];
      var neverUsageData = [];

      this.state.subscriptions.forEach(function(subscription) {
        var totalReviews = 0;
        var currentSubReviews = [];
        var currentSubDaily = [];
        var currentSubWeekly = [];
        var currentSubMonthly = [];
        var currentSubYearly = [];
        var currentSubNever = [];

        radarData[subscription.id] = {};
        currentSubReviews = ReviewStore.findBySubscriptionId(parseInt(subscription.id));
        totalReviews = currentSubReviews.length;

        if (totalReviews === 0) {
          return;
        }

        var totalUsageSum = 0;
        var totalRatingSum = 0;

        currentSubDaily = currentSubReviews.filter(function(review) {
          return review.frequency === 5;
        });
        currentSubWeekly = currentSubReviews.filter(function(review) {
          return review.frequency === 4;
        });
        currentSubMonthly = currentSubReviews.filter(function(review) {
          return review.frequency === 3;
        });
        currentSubYearly = currentSubReviews.filter(function(review) {
          return review.frequency === 2;
        });
        currentSubNever = currentSubReviews.filter(function(review) {
          return review.frequency === 1;
        });

        currentSubReviews.forEach(function(review) {
          totalUsageSum += review.frequency;
          totalRatingSum += review.rating;
        });

        labels.push(subscription.name);
        avgUsage[subscription.name]=(totalUsageSum/totalReviews);
        avgRating[subscription.name]=(totalRatingSum/totalReviews);
        dailyUsageData.push(Math.round(currentSubDaily.length/totalReviews * 100));
        weeklyUsageData.push(Math.round(currentSubWeekly.length/totalReviews * 100));
        monthlyUsageData.push(Math.round(currentSubMonthly.length/totalReviews * 100));
        yearlyUsageData.push(Math.round(currentSubYearly.length/totalReviews * 100));
        neverUsageData.push(Math.round(currentSubNever.length/totalReviews * 100));

      });

      var sortedUsage = [];
      var sortedRating = [];
      for (var name in avgUsage) {
        sortedUsage.push([name, avgUsage[name]]);
        sortedRating.push([name, avgRating[name]]);
      }
      sortedUsage.sort(function(a, b) {return a[1] - b[1];});
      sortedRating.sort(function(a, b) {return a[1] - b[1];});

      var horizontalBarUsageLabels = [];
      var horizontalBarUsageData = [];
      var horizontalBarRatingLabels = [];
      var horizontalBarRatingData = [];

      var horizontalBarLeastUsedLabels = [];
      var horizontalBarLeastUsedData = [];
      var horizontalBarMostUsedLabels = [];
      var horizontalBarMostUsedData = [];
      sortedUsage.forEach(function(subInfo, usage) {
        horizontalBarUsageLabels.push(subInfo[0]);
        horizontalBarUsageData.push(Number(Math.round((subInfo[1])+'e2')+'e-2'));
      });

      var horizontalBarLeastRatedLabels = [];
      var horizontalBarLeastRatedData = [];
      var horizontalBarMostRatedLabels = [];
      var horizontalBarMostRatedData = [];
      sortedRating.forEach(function(subInfo) {
        horizontalBarRatingLabels.push(subInfo[0]);
        horizontalBarRatingData.push(Number(Math.round((subInfo[1])+'e2')+'e-2'));
      });

      for (var i = 0; i < 5; i ++) {
        horizontalBarLeastRatedLabels.push([horizontalBarRatingLabels[i]]);
        horizontalBarLeastRatedData.push([horizontalBarRatingData[i]]);
        horizontalBarMostRatedLabels.push([horizontalBarRatingLabels[horizontalBarRatingLabels.length - i - 1]]);
        horizontalBarMostRatedData.push([horizontalBarRatingData[horizontalBarRatingLabels.length - i - 1]]);
        horizontalBarLeastUsedLabels.push([horizontalBarUsageLabels[i]]);
        horizontalBarLeastUsedData.push([horizontalBarUsageData[i]]);
        horizontalBarMostUsedLabels.push([horizontalBarUsageLabels[horizontalBarUsageLabels.length - i - 1]]);
        horizontalBarMostUsedData.push([horizontalBarUsageData[horizontalBarUsageLabels.length - i - 1]]);
      }

      return <div>
        <div className="container horizontal-bar-charts-container">
          <h1 className="green-text"> Statistics </h1>
          <h3> Ratings and usage charts for all users on the site </h3>
          <ReviewsRadarChart dailyUsageData={dailyUsageData} weeklyUsageData={weeklyUsageData}
            monthlyUsageData={monthlyUsageData} yearlyUsageData={yearlyUsageData}
            neverUsageData={neverUsageData} labels={labels}/>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <h4> Highest Rated Services </h4>
              <HorizontalBarChart data={horizontalBarMostRatedData} labels={horizontalBarMostRatedLabels} colors={['#58CF6C']} horizontal={true} />
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <h4> Most Used Services </h4>
              <HorizontalBarChart data={horizontalBarMostUsedData} labels={horizontalBarMostUsedLabels} colors={['#58CF6C']} horizontal={true} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <h4> Lowest Rated Services </h4>
              <HorizontalBarChart data={horizontalBarLeastRatedData} labels={horizontalBarLeastRatedLabels} colors={['#FF9824']} horizontal={true} />
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <h4> Least Used Services </h4>
              <HorizontalBarChart data={horizontalBarLeastUsedData} labels={horizontalBarLeastUsedLabels} colors={['#FF9824']} horizontal={true} />
            </div>
          </div>
        </div>
      </div>;
    }

  }
});

module.exports = AnalyticsPage;
