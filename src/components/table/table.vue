<template>
  <div :class="tableCls">
    <div class="h-table-header" :style="{'padding-right': (scrollWidth+'px')}">
      <table :style="{'margin-left': (-scrollLeft+'px')}">
        <colgroup>
          <col v-if="checkbox" width="60" />
          <col v-for="(c, index) of computeColumns" :width="getWidth(c)" :key="index+update.columns" />
        </colgroup>
        <tr>
          <th v-if="checkbox" class="h-table-th-checkbox">
            <Checkbox v-if="fixedColumnLeft.length==0" :indeterminate="checks.length>0&&checks.length<datas.length" :checked="checks.length>0&&checks.length == datas.length" @click.native="checkAll"></Checkbox>
          </th>
          <slot v-if="!columns.length&&!$scopedSlots.default" ></slot>
          <template v-else>
            <TableTh v-for="(c, index) of computeColumns" :key="index+update.columns" v-bind="c" :sortStatus="sortStatus" ></TableTh>
          </template>
        </tr>
      </table>
      <div class="h-table-fixed-cover" :style="{'width': (scrollWidth+'px')}"></div>
    </div>
    <div class="h-table-container">
      <div class="h-table-content-empty" v-if="datas.length == 0">
        <slot name='empty'></slot>
        <div v-if="!$slots.empty">暂无数据</div>
      </div>
      <div class="h-table-body" v-show="datas.length" :style="bodyStyle">
        <table>
          <colgroup>
            <col v-if="checkbox" width="60" />
            <col v-for="(c, index) of computeColumns" :width="getWidth(c)" :key="index+update.columns" />
          </colgroup>
          <tbody class="h-table-tbody">
            <template v-for="(d, index) of datas">
              <TableTr :datas="d" :key="index+update.datas" :index="index" :trIndex="index" :class="{'h-table-tr-selected': checks.indexOf(d)>-1}">
                <td v-if="checkbox" class="h-table-td-checkbox">
                  <Checkbox v-if="fixedColumnLeft.length==0" v-model="checks" :value="d"></Checkbox>
                </td>
                <slot :data="d" :index="index" v-if="$scopedSlots.default"></slot>
              </TableTr>
              <tr :key="index+update.datas+'expand'" class="h-table-expand-tr" v-if="$scopedSlots.expand && d._expand">
                <td class="h-table-expand-cell" :colspan="totalCol">
                  <slot :data="d" :index="index" name="expand"></slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
  
      <div v-if="fixedColumnLeft.length" class="h-table-fixed-left" v-width="leftWidth" :style="fixedBodyStyle">
        <table :style="{'margin-top': (-scrollTop+'px')}" v-width="tableWidth">
          <colgroup>
            <col v-if="checkbox" width="60" />
            <col v-for="(c, index) of computeColumns" :width="getWidth(c)" :key="index+update.columns" />
          </colgroup>
          <tbody class="h-table-tbody">
            <template v-for="(d, index) of datas">
              <TableTr :datas="d" :key="index+update.datas" :index="index" :trIndex="index" :class="{'h-table-tr-selected': checks.indexOf(d)>-1}">
                <td v-if="checkbox" class="h-table-td-checkbox">
                <Checkbox v-model="checks" :value="d"></Checkbox>
                </td>
                <slot :data="d" :index="index" v-if="$scopedSlots.default"></slot>
              </TableTr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="fixedColumnRight.length" class="h-table-fixed-right" v-width="rightWidth" :style="fixedRightBodyStyle">
        <table :style="{'margin-top': (-scrollTop+'px')}" v-width="tableWidth">
          <colgroup>
            <col v-for="(c, index) of computeColumns" :width="getWidth(c)" :key="index+update.columns" />
          </colgroup>
          <tbody class="h-table-tbody">
            <template v-for="(d, index) of datas">
              <TableTr :datas="d" :key="index+update.datas" :index="index" :trIndex="index" :class="{'h-table-tr-selected': checks.indexOf(d)>-1}">
                <slot :data="d" :index="index" v-if="$scopedSlots.default"></slot>
              </TableTr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="fixedColumnLeft.length" class="h-table-fixed-header-left">
      <table v-width="leftWidth">
        <colgroup>
          <col v-if="checkbox" width="60" />
          <col v-for="(c, index) of fixedColumnLeft" :width="getWidth(c)" :key="index+update.columns" />
        </colgroup>
        <tr>
          <th v-if="checkbox" class="h-table-th-checkbox">
            <Checkbox :indeterminate="checks.length>0&&checks.length<datas.length" :checked="datas.length > 0 && checks.length == datas.length" @click.native="checkAll"></Checkbox>
          </th>
          <th v-for="(c, index) of fixedColumnLeft" :key="index+update.columns" :class="{[`text-${c.align}`]: !!c.align}">{{c.title}}</th>
        </tr>
      </table>
    </div>
    <div v-if="fixedColumnRight.length" :style="{'margin-right': (scrollWidth+'px')}" class="h-table-fixed-header-right">
      <table v-width="rightWidth">
        <colgroup>
          <col v-for="(c, index) of fixedColumnRight" :width="getWidth(c)" :key="index+update.columns" />
        </colgroup>
        <tr>
          <th v-for="(c, index) of fixedColumnRight" :key="index+update.columns" :class="{[`text-${c.align}`]: !!c.align}">{{c.title}}</th>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import utils from '../../utils/utils';
import TableTr from './table-tr';
import TableTh from './table-item';

const prefix = 'h-table';

export default {
  name: 'Table',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    datas: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    height: Number,
    checkbox: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      update: {
        datas: 0,
        columns: 0
      },
      scrollWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
      checks: [],
      hoveredTr: null,
      leftWidth: 0,
      rightWidth: 0,
      tableWidth: 400,
      computeColumns: [],
      datasBak: [...this.datas],
      sortStatus: {
        type: null,
        prop: null
      }
    };
  },
  watch: {
    datas: {
      handler(value, oldValue) {
        if (this.height || this.fixedColumnLeft.length || this.fixedColumnRight.length) {
          this.resize();
        }
        let changed = this.datasBak.length != this.datas.length;
        let n = 0;
        while(!changed && this.datas.length > n){
          changed = this.datas[n] !== this.datasBak[n];
          n++;
        }
        if (changed) {
          this.update.datas += 1;
        }
        this.datasBak = [...this.datas];
      },
      deep: true
    },
    columns: {
      handler() {
        this.initColumns();
        if (this.height || this.fixedColumnLeft.length || this.fixedColumnRight.length) {
          this.resize();
        }
        this.update.columns += 1;
      },
      deep: true
    },
    checks: {
      handler() {
        this.$emit('select', this.checks);
      },
      deep: true
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  mounted() {
    this.$watch('datas', (value, oldValue) => {
      this.checks.splice(0, this.checks.length);
    })
    this.initColumns();
    this.$nextTick(() => {
      let body = this.$el.querySelector(".h-table-body");
      if (body) {
        let scrollEvent = (event) => {
          // event.preventDefault();
          // event.stopPropagation();
          body.scrollLeft = body.scrollLeft + (event.deltaX);
          body.scrollTop = body.scrollTop + (event.deltaY);
          if (this.scrollTop != body.scrollTop) {
            event.stopPropagation();
            event.preventDefault();
          }
          this.scrollLeft = body.scrollLeft;
          this.scrollTop = body.scrollTop;
        };
        body.addEventListener("scroll", () => {
          this.scrollLeft = body.scrollLeft;
          this.scrollTop = body.scrollTop;
        });
        let fixedright = this.$el.querySelector(".h-table-fixed-right");
        let fixedleft = this.$el.querySelector(".h-table-fixed-left");
        if (fixedright) {
          fixedright.addEventListener("mousewheel", scrollEvent);
        }
        if (fixedleft) {
          fixedleft.addEventListener("mousewheel", scrollEvent);
        }
      }
      if(this.fixedColumnLeft.length||this.fixedColumnRight.length){
        window.addEventListener('resize', this.resize);
      }
      this.resize();

      let tbodys = this.$el.querySelectorAll(".h-table-tbody");
      for(let tbody of tbodys){
        tbody.addEventListener("mouseover", (event) => {
          let tr = null;
          let target = event.target;
          while(target.parentNode != window.document.body){
            if(target.tagName == 'TR'){
              tr = target;
              break;
            }
            target = target.parentNode;
          }
          if (tr) {
            utils.addClass(tr, 'h-table-tr-hovered');
            let index = tr.getAttribute('trIndex');
            for(let el of this.$el.querySelectorAll(`.h-table-tbody>tr[trIndex='${index}']`)||[]){
              utils.addClass(el, 'h-table-tr-hovered');
            }
          }
        }, false);
        tbody.addEventListener("mouseout", (event) => {
          for(let el of this.$el.querySelectorAll('.h-table-tr-hovered')||[]){
            utils.removeClass(el, 'h-table-tr-hovered');
          }
        }, false);
      }
    });
  },
  methods: {
    clearSelection() {
      this.checks = [];
    },
    clearSort() {
      this.sortStatus.prop = null;
      this.sortStatus.type = null;
    },
    triggerSort(data){
      this.sortStatus.prop = data.prop;
      this.sortStatus.type = data.type;
      this.$emit('sort', utils.copy(data));
      return this.sortStatus;
    },
    setSelection(data) {
      if(utils.isArray(data)) {
        this.checks = [...data];
      }
    },
    checkAll() {
      if (this.checks.length == this.datas.length) {
        this.checks.splice(0, this.datas.length);
      } else {
        this.checks = utils.extend([], this.datas);
      }
      this.$emit('selectAll', this.checks);
    },
    getWidth(column) {
      if (utils.isObject(column) && column.width) {
        return column.width;
      } else {
        return "";
      }
    },
    resize() {
      this.$nextTick(() => {
        let body = this.$el.querySelector(".h-table-body");
        if (body) {
          this.scrollWidth = body.offsetWidth - body.clientWidth;
          this.scrollHeight = body.offsetHeight - body.clientHeight;
        }
        this.tableWidth = this.$el.querySelector(".h-table-container").clientWidth;
        this.initFixedWidth();
      });
    },
    mouseover(data) {
      this.hoveredTr = data;
    },
    mouseout() {
      this.hoveredTr = null;
    },
    initFixedWidth() {
      let ths = this.$el.querySelectorAll(".h-table-header table>tr>th");
      let fixedColumnLeftLength = this.fixedColumnLeft.length + (this.checkbox ? 1 : 0);
      let leftWidth = 0;
      for (let i = 0; i < fixedColumnLeftLength; i++) {
        leftWidth += ths[i].clientWidth || 0;
      }
      this.leftWidth = leftWidth;

      let fixedColumnRightLength = this.fixedColumnRight.length;
      let rightWidth = 0;
      for (let i = ths.length - 1; i > ths.length - fixedColumnRightLength - 1; i--) {
        rightWidth += ths[i].clientWidth || 0;
      }
      this.rightWidth = rightWidth;
    },
    refresh() {
      this.initColumns();
      this.$nextTick(() => {
        this.resize();
      })
    },
    initColumns() {
      if (this.columns.length) {
        this.computeColumns = this.columns;
        return ;
      }
      let columns = [];
      if(this.$slots.default){
        for(let slot of this.$slots.default){
          if(slot.componentOptions&&slot.componentOptions.tag == "TableItem"){
            columns.push(slot.componentOptions.propsData);
          }
        }
      }
      this.computeColumns = columns;
    }
  },
  computed: {
    totalCol() {
      return (this.checkbox ? 1 : 0) + this.computeColumns.length;
    },
    fixedColumnLeft() {
      let columns = [];
      for (let c of this.computeColumns) {
        if (c.fixed == 'left') {
          columns.push(c);
        }
      }
      return columns;
    },
    fixedColumnRight() {
      let columns = [];
      for (let c of this.computeColumns) {
        if (c.fixed == 'right') {
          columns.push(c);
        }
      }
      return columns;
    },
    tableCls() {
      return {
        [prefix]: true,
        [`${prefix}-border`]: !!this.border,
        [`${prefix}-stripe`]: this.stripe
      }
    },
    fixedBodyStyle() {
      let s = {};
      s['bottom'] = `${this.scrollHeight}px`;
      if (!!this.height) {
        s.maxHeight = `${this.height}px`;
      }
      return s;
    },
    fixedRightBodyStyle() {
      let s = {};
      s['margin-right'] = `${this.scrollWidth}px`;
      s['bottom'] = `${this.scrollHeight}px`;
      if (!!this.height) {
        s.maxHeight = `${this.height}px`;
      }
      return s;
    },
    bodyStyle() {
      let s = {};
      if (!!this.height) {
        s.maxHeight = `${this.height}px`;
        // s.overflow = 'auto';
      }
      return s;
    }
  },
  components: {
    TableTr,
    TableTh
  }
};
</script>