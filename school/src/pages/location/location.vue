<template>
  <div class="location-container">
    <backBar :title="title"></backBar>
    <div id="allmap" :style="mapStyle" ref="allmap"></div>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import S_Storage from '@/utils/storage/sessionStorage'

export default {
  data:function(){
    return{
      title: '我的位置',
      mapStyle: {
        width: '100%',
        height: this.mapHeight + 'px',
      },
    }
  },
  components: {
    backBar,
  },
  mounted() {
    this.map();
  },
  computed: {
    loginUser() {
      return S_Storage.getSession('loginUser');
    },
  },
  methods: {
    map() {
      const _this = this;
      var map = new BMap.Map('allmap');
      var point = new BMap.Point(104.088032,30.662863);
      map.centerAndZoom(point,12);
      function myFun(result){
        var cityName = result.name;
        map.setCenter(cityName);
        _this.title = '我的位置:  ' + cityName;
      };
      var myCity = new BMap.LocalCity();
      myCity.get(myFun);
      map.enableScrollWheelZoom();
      map.enableContinuousZoom();
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      map.centerAndZoom(point, 15);
      var opts = {
        width: 180,
        height: 80,
        enableMessage: true,
        message: '',
      };
      var infoWindow = new BMap.InfoWindow('地址：' + _this.loginUser.address, opts);
      marker.addEventListener('click', function() {
        map.openInfoWindow(infoWindow,point);
      });
    },
  },
}
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
