<template>
  <div class="relative w-full h-[calc(100vh-112px)] overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col select-none transition-colors duration-300">
    
    <!-- ══════════════════════════════════════════════════════════════════════════
         COMPACT, COLLAPSIBLE & DOCKABLE CANVAS TOOLBAR — Organized by Category
         ══════════════════════════════════════════════════════════════════════════ -->
    <div 
      class="absolute z-20 transition-all duration-300 select-none pointer-events-auto"
      :class="toolbarPosition === 'bottom' ? 'bottom-4 left-4' : 'top-4 left-4'"
    >
      <!-- 👁️ Collapsed Mini-Pill State -->
      <div 
        v-if="isToolbarCollapsed" 
        class="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-1.5 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200"
      >
        <button 
          @click="toggleToolbarCollapse"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 rounded-xl text-xs font-bold transition"
          title="ขยายแถบเครื่องมือ"
        >
          <Layers class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>เครื่องมือผัง</span>
          <ChevronDown v-if="toolbarPosition === 'top'" class="w-3.5 h-3.5" />
          <ChevronUp v-else class="w-3.5 h-3.5" />
        </button>
        <span class="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 px-1">
          {{ Math.round(marketStore.zoomLevel * 100) }}%
        </span>
        <button @click="zoomIn" class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition active:scale-95" title="ซูมเข้า">
          <ZoomIn class="w-3.5 h-3.5" />
        </button>
        <button @click="zoomOut" class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition active:scale-95" title="ซูมออก">
          <ZoomOut class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- 📐 Expanded Panel — Organized by Category -->
      <div 
        v-else 
        class="flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden w-56 transition-all duration-200"
      >
        <!-- ── Header Bar ── -->
        <div class="flex items-center justify-between px-3 py-2 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/60 dark:border-slate-700/60">
          <div class="flex items-center gap-2">
            <Layers class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 tracking-widest uppercase">เครื่องมือผัง</span>
          </div>
          <div class="flex items-center gap-0.5">
            <div class="text-[10px] text-slate-400 dark:text-slate-500 font-mono hidden md:flex items-center gap-1 mr-1">
              <Maximize2 class="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
              <span>{{ marketStore.marketWidthMeters }}×{{ marketStore.marketHeightMeters }}ม.</span>
            </div>
            <button @click="toggleToolbarPosition" class="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition" :title="toolbarPosition === 'top' ? 'ย้ายไปด้านล่าง' : 'ย้ายไปด้านบน'">
              <Move class="w-3.5 h-3.5" />
            </button>
            <button @click="toggleToolbarCollapse" class="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition" title="พับเก็บแถบ">
              <ChevronUp v-if="toolbarPosition === 'top'" class="w-3.5 h-3.5" />
              <ChevronDown v-else class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-2 p-2.5">

          <!-- ── หมวด 1: มุมมอง ── -->
          <div class="flex flex-col gap-1.5">
            <p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 px-0.5">
              <span>🔍</span><span>มุมมอง</span>
            </p>
            <!-- Zoom Row -->
            <div class="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200/60 dark:border-slate-700/60">
              <button @click="zoomOut" class="p-1 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition active:scale-95" title="Zoom Out">
                <ZoomOut class="w-3.5 h-3.5" />
              </button>
              <span class="text-xs font-mono text-slate-700 dark:text-slate-200 flex-1 text-center font-bold">
                {{ Math.round(marketStore.zoomLevel * 100) }}%
              </span>
              <button @click="zoomIn" class="p-1 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition active:scale-95" title="Zoom In">
                <ZoomIn class="w-3.5 h-3.5" />
              </button>
              <div class="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-0.5"></div>
              <button @click="resetZoom" class="px-2 py-0.5 hover:bg-white dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] rounded-lg font-semibold transition" title="รีเซ็ต 1:1">
                1:1
              </button>
            </div>
            <!-- Grid Snap -->
            <button
              @click="marketStore.snapToGrid = !marketStore.snapToGrid"
              class="w-full px-2.5 py-1.5 text-xs rounded-xl border transition-all flex items-center gap-2 active:scale-95"
              :class="marketStore.snapToGrid 
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 font-semibold' 
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'"
              :title="`Snap กริด ${marketStore.gridSnapMeters} เมตร (${marketStore.snapToGrid ? 'เปิด' : 'ปิด'})`"
            >
              <Grid class="w-3.5 h-3.5 shrink-0" />
              <span class="flex-1">Snap กริด {{ marketStore.gridSnapMeters }}ม.</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                :class="marketStore.snapToGrid ? 'bg-indigo-200 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'">
                {{ marketStore.snapToGrid ? 'ON' : 'OFF' }}
              </span>
            </button>
          </div>

          <div class="h-px bg-slate-200/70 dark:bg-slate-700/60"></div>

          <!-- ── หมวด 2: แผงค้า ── -->
          <div class="flex flex-col gap-1.5">
            <p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 px-0.5">
              <span>🏪</span><span>แผงค้า</span>
            </p>
            <button
              @click="marketStore.addStall()"
              class="w-full px-3 py-2 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold transition flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-300 dark:shadow-none active:scale-95"
              title="เพิ่มแผงค้าใหม่ในผัง"
            >
              <Plus class="w-3.5 h-3.5" />
              <span>เพิ่มแผงค้าใหม่</span>
            </button>
          </div>

          <div class="h-px bg-slate-200/70 dark:bg-slate-700/60"></div>

          <!-- ── หมวด 3: สถานที่ในผัง ── -->
          <div class="flex flex-col gap-1.5">
            <p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 px-0.5">
              <span>🗺️</span><span>สถานที่ในผัง</span>
            </p>

            <div class="flex flex-col gap-1">
              <div v-for="cat in PRESET_CATEGORIES" :key="cat.id" class="flex flex-col">
                <!-- Category Toggle Button -->
                <button
                  @click.stop="toggleCategoryDropdown(cat.id)"
                  class="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl border transition-all active:scale-95"
                  :class="activeDropdown === cat.id
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 font-medium'"
                >
                  <div class="flex items-center gap-2">
                    <component :is="cat.icon" class="w-3.5 h-3.5 shrink-0" :style="{ color: activeDropdown === cat.id ? 'currentColor' : cat.color }" />
                    <span>{{ cat.label }}</span>
                    <span class="text-[9px] opacity-50">({{ cat.presets.length }})</span>
                  </div>
                  <ChevronDown class="w-3 h-3 transition-transform shrink-0" :class="{ 'rotate-180': activeDropdown === cat.id }" />
                </button>

                <!-- Inline Expanded Preset List (no floating popover) -->
                <Transition name="slide-down">
                  <div
                    v-if="activeDropdown === cat.id"
                    class="mt-0.5 ml-3 border-l-2 pl-2 flex flex-col gap-0.5 pb-0.5"
                    :style="{ borderColor: cat.color + '60' }"
                    @click.stop
                  >
                    <button
                      v-for="preset in cat.presets"
                      :key="preset.type + preset.subType"
                      @click="handleAddObjectFromDropdown(preset)"
                      class="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between group/item"
                    >
                      <div class="flex items-center gap-2">
                        <component :is="getIconComponent(preset.styleProps.icon)" class="w-3.5 h-3.5 shrink-0 opacity-75" :style="{ color: preset.styleProps.color }" />
                        <span class="text-[11px] font-medium text-slate-700 dark:text-slate-200 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">{{ preset.label }}</span>
                      </div>
                      <span class="text-[9px] font-mono text-slate-400 dark:text-slate-500 shrink-0 ml-1">{{ preset.widthM }}×{{ preset.heightM }}</span>
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Canvas Area with Dynamic Grid (Light / Dark Grid) -->
    <div 
      ref="canvasContainer"
      class="w-full h-full relative cursor-grab active:cursor-grabbing overflow-auto transition-colors duration-300"
      :class="marketStore.isDark ? 'bg-slate-950 bg-dot-pattern' : 'bg-slate-50 bg-dot-pattern-light'"
      @mousedown="handleCanvasMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleMouseUp"
    >
      <div 
        class="absolute origin-top-left transition-transform duration-75"
        :style="{
          transform: `scale(${marketStore.zoomLevel}) translate(${marketStore.panOffset.x}px, ${marketStore.panOffset.y}px)`,
          width: `${marketStore.canvasWidthPx + 100}px`,
          height: `${marketStore.canvasHeightPx + 100}px`
        }"
      >
        <!-- Market Map Perimeter Boundary Box -->
        <div 
          class="absolute border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl pointer-events-none flex flex-col justify-between p-4 bg-white/40 dark:bg-slate-900/30 shadow-xs"
          :style="{
            left: '20px',
            top: '20px',
            width: `${marketStore.canvasWidthPx}px`,
            height: `${marketStore.canvasHeightPx}px`
          }"
        >
          <div class="flex items-start justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wide">
            <span class="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold">
              📐 พื้นที่ตลาดรวม: {{ marketStore.marketWidthMeters }} × {{ marketStore.marketHeightMeters }} เมตร ({{ marketStore.totalMarketAreaSqM }} ตร.ม.)
            </span>
          </div>

          <!-- Bottom Metric Ruler Indicator -->
          <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500 border-t border-slate-200/80 dark:border-slate-800 pt-2">
            <span>0.0 ม.</span>
            <span>กว้าง {{ marketStore.marketWidthMeters / 2 }} ม.</span>
            <span>กว้าง {{ marketStore.marketWidthMeters }} ม.</span>
          </div>
        </div>

        <!-- ─── ARCHITECTURE OBJECTS LAYER (Walkways, Entrances, Facilities, Obstacles) ─── -->
        <div
          v-for="obj in marketStore.layoutObjects"
          :key="obj.id"
          class="absolute rounded-2xl border-2 transition-all duration-200 cursor-move flex flex-col justify-between p-2 group shadow-sm backdrop-blur-xs"
          :class="[
            marketStore.selectedObjectId === obj.id 
              ? 'ring-4 ring-indigo-500 border-indigo-500 z-20 shadow-xl scale-[1.02]' 
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 z-10',
            obj.type === 'walkway' ? 'bg-slate-200/60 dark:bg-slate-800/60 border-dashed' : '',
            obj.type === 'entrance' ? 'bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-400' : '',
            obj.type === 'exit' ? 'bg-amber-50/90 dark:bg-amber-950/80 border-amber-400' : '',
            obj.type === 'restricted' ? 'bg-slate-300/80 dark:bg-slate-900/90 border-slate-400' : '',
            obj.type === 'facility' ? 'bg-sky-50/90 dark:bg-sky-950/80 border-sky-400' : ''
          ]"
          :style="{
            left: `${obj.x + 20}px`,
            top: `${obj.y + 20}px`,
            width: `${obj.width}px`,
            height: `${obj.height}px`,
            transform: `rotate(${obj.rotation || 0}deg)`
          }"
          @mousedown.stop="startDragObject($event, obj)"
          @touchstart.stop="startTouchDragObject($event, obj)"
          @click.stop="marketStore.selectLayoutObject(obj.id)"
        >
          <!-- Active Selection Handles -->
          <template v-if="marketStore.selectedObjectId === obj.id">
            <div class="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md animate-pulse"></div>
            <div class="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md"></div>
          </template>

          <div class="flex items-center gap-1.5 font-bold text-xs text-slate-800 dark:text-slate-100">
            <component :is="getIconComponent(obj.styleProps?.icon)" class="w-4 h-4 shrink-0" :style="{ color: obj.styleProps?.color }" />
            <span class="truncate tracking-tight">{{ obj.label }}</span>
          </div>

          <div class="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-auto">
            <span>{{ marketStore.pxToM(obj.width) }}×{{ marketStore.pxToM(obj.height) }}ม.</span>
            <span v-if="obj.rotation" class="font-bold text-indigo-600 dark:text-indigo-400">{{ obj.rotation }}°</span>
          </div>

          <!-- RESIZE HANDLE -->
          <div 
            class="absolute -bottom-2 -right-2 w-5 h-5 bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full cursor-se-resize flex items-center justify-center shadow-md border-2 border-white dark:border-slate-900 transition-all duration-150 z-30"
            :class="marketStore.selectedObjectId === obj.id ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'"
            title="ปรับขนาด"
            @mousedown.stop="startResizeObject($event, obj)"
            @touchstart.stop="startTouchResizeObject($event, obj)"
          >
            <div class="w-1.5 h-1.5 border-r-2 border-b-2 border-current"></div>
          </div>
        </div>

        <!-- ─── STALL BLOCKS LAYER ─── -->
        <div
          v-for="stall in marketStore.stalls"
          :key="stall.id"
          class="absolute rounded-2xl border-2 transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:shadow-xl cursor-move flex flex-col justify-between p-2.5 group backdrop-blur-xs"
          :class="[
            marketStore.selectedStallId === stall.id 
              ? 'ring-4 ring-indigo-500/80 border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/80 z-20 shadow-xl scale-[1.02]' 
              : getStallStatusClasses(stall),
          ]"
          :style="{
            left: `${stall.x + 20}px`,
            top: `${stall.y + 20}px`,
            width: `${stall.width}px`,
            height: `${stall.height}px`
          }"
          @mousedown.stop="startDragStall($event, stall)"
          @touchstart.stop="startTouchDragStall($event, stall)"
          @click.stop="marketStore.selectStall(stall.id)"
        >
          <!-- Active Selection Corner Handle Decorators -->
          <template v-if="marketStore.selectedStallId === stall.id">
            <div class="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md animate-pulse"></div>
            <div class="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md"></div>
            <div class="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md"></div>
          </template>

          <!-- Top Accent Zone Indicator Pill -->
          <div 
            class="h-1.5 w-full rounded-full mb-1 transition-transform group-hover:scale-x-105 shadow-xs"
            :style="{ backgroundColor: marketStore.getZoneById(stall.zoneId)?.color || '#94a3b8' }"
          ></div>

          <!-- Stall No & Real-World Dimensions -->
          <div class="flex items-center justify-between text-slate-900 dark:text-white font-semibold gap-1 leading-relaxed">
            <span class="text-xs sm:text-sm font-bold font-mono tracking-tight drop-shadow-xs pt-0.5">{{ stall.stallNo }}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 font-mono text-slate-600 dark:text-slate-300 font-semibold shadow-xs">
              {{ marketStore.pxToM(stall.width) }}×{{ marketStore.pxToM(stall.height) }}ม.
            </span>
          </div>

          <!-- Price & Status Badge -->
          <div class="flex items-center justify-between mt-auto gap-1">
            <span 
              class="text-[10px] px-2 py-0.5 rounded-full font-bold border shadow-xs transition-colors"
              :class="{
                'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800': stall.status === 'available',
                'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700': stall.status === 'booked',
                'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800': stall.status === 'disabled'
              }"
            >
              {{ getStatusLabel(stall.status) }}
            </span>

            <span class="text-[11px] font-mono text-slate-800 dark:text-slate-200 font-bold">
              ฿{{ stall.price }}
            </span>
          </div>

          <!-- RESIZE HANDLE -->
          <div 
            class="absolute -bottom-2 -right-2 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full cursor-se-resize flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-950 transition-all duration-150 z-30"
            :class="marketStore.selectedStallId === stall.id ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'"
            title="ลากเพื่อปรับขนาด (Resize)"
            @mousedown.stop="startResizeStall($event, stall)"
            @touchstart.stop="startTouchResizeStall($event, stall)"
          >
            <div class="w-2 h-2 border-r-2 border-b-2 border-white"></div>
          </div>
        </div>

      </div>
    </div>

    <!-- Quick Stall Inspector Floating Pill Footer -->
    <div 
      v-if="marketStore.selectedStall"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-4 text-xs animate-slide-up text-slate-800 dark:text-slate-200"
    >
      <div class="flex items-center gap-2">
        <span 
          class="w-3 h-3 rounded-full shadow-xs"
          :style="{ backgroundColor: marketStore.getZoneById(marketStore.selectedStall.zoneId)?.color }"
        ></span>
        <span class="font-bold text-slate-900 dark:text-white text-sm">แผง {{ marketStore.selectedStall.stallNo }}</span>
        <span class="text-slate-500 dark:text-slate-400 font-medium">({{ marketStore.getZoneById(marketStore.selectedStall.zoneId)?.name }})</span>
      </div>

      <div class="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>

      <!-- Stall Real-World Metric Info -->
      <div class="flex items-center gap-3 font-mono text-slate-700 dark:text-slate-300 font-semibold">
        <span>กว้าง: <strong class="text-indigo-600 dark:text-indigo-400">{{ selectedMetrics.widthM }} ม.</strong></span>
        <span>ยาว: <strong class="text-indigo-600 dark:text-indigo-400">{{ selectedMetrics.heightM }} ม.</strong></span>
        <span>พื้นที่: <strong class="text-emerald-600 dark:text-emerald-400">{{ selectedMetrics.areaSqM }} ตร.ม.</strong></span>
      </div>

      <div class="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>

      <div class="flex items-center gap-2">
        <button 
          @click="$emit('open-editor')"
          class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          แก้ไขรายละเอียด
        </button>
        <button 
          @click="marketStore.removeStall(marketStore.selectedStall.id)"
          class="p-1.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl transition-all duration-150 hover:scale-105"
          title="ลบแผงค้านี้"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Quick Architecture Object Inspector Floating Pill Footer -->
    <div 
      v-if="marketStore.selectedObject"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-4 text-xs animate-slide-up text-slate-800 dark:text-slate-200"
    >
      <div class="flex items-center gap-2">
        <component :is="getIconComponent(marketStore.selectedObject.styleProps?.icon)" class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <span class="font-bold text-slate-900 dark:text-white text-sm">{{ marketStore.selectedObject.label }}</span>
      </div>

      <div class="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>

      <div class="flex items-center gap-3 font-mono text-slate-700 dark:text-slate-300 font-semibold">
        <span>ขนาด: <strong>{{ selectedObjectMetrics.widthM }} × {{ selectedObjectMetrics.heightM }} ม.</strong></span>
        <span>หมุน: <strong class="text-indigo-600 dark:text-indigo-400">{{ marketStore.selectedObject.rotation || 0 }}°</strong></span>
      </div>

      <div class="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>

      <div class="flex items-center gap-2">
        <button 
          @click="marketStore.rotateLayoutObject(marketStore.selectedObject.id)"
          class="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-all duration-150"
          title="หมุนวัตถุ 90°"
        >
          <RotateCw class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </button>

        <button 
          @click="$emit('open-object-editor')"
          class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          แก้ไขวัตถุ
        </button>

        <button 
          @click="marketStore.removeLayoutObject(marketStore.selectedObject.id)"
          class="p-1.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl transition-all duration-150 hover:scale-105"
          title="ลบวัตถุนี้"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { ARCHITECTURE_PRESETS } from '../../types/market'
import { 
  ZoomIn, 
  ZoomOut, 
  Grid, 
  Trash2, 
  Maximize2, 
  RotateCw, 
  DoorOpen, 
  LogOut, 
  Footprints, 
  Square, 
  Bath, 
  Mic, 
  Trash2 as TrashIcon, 
  CreditCard, 
  HelpCircle, 
  Cross,
  ChevronDown,
  ChevronUp,
  Layers,
  Plus,
  Move
} from 'lucide-vue-next'

const marketStore = useMarketStore()
const canvasContainer = ref(null)

defineEmits(['open-editor', 'open-object-editor'])

// ─── Toolbar State (Collapsible, Dockable & Categories) ────────────────────────
const isToolbarCollapsed = ref(localStorage.getItem('admin_toolbar_collapsed') === 'true')
const toolbarPosition = ref(localStorage.getItem('admin_toolbar_position') || 'top')
const activeDropdown = ref(null)

function toggleToolbarCollapse() {
  isToolbarCollapsed.value = !isToolbarCollapsed.value
  localStorage.setItem('admin_toolbar_collapsed', String(isToolbarCollapsed.value))
  activeDropdown.value = null
}

function toggleToolbarPosition() {
  toolbarPosition.value = toolbarPosition.value === 'top' ? 'bottom' : 'top'
  localStorage.setItem('admin_toolbar_position', toolbarPosition.value)
  activeDropdown.value = null
}

function toggleCategoryDropdown(catId) {
  activeDropdown.value = activeDropdown.value === catId ? null : catId
}

function handleAddObjectFromDropdown(preset) {
  marketStore.addLayoutObject(preset)
  activeDropdown.value = null
}

// Grouped Categories according to toolbar1.md
const PRESET_CATEGORIES = computed(() => [
  {
    id: 'access',
    label: 'ทางเข้า/ออก',
    icon: DoorOpen,
    color: '#10b981',
    presets: ARCHITECTURE_PRESETS.filter(p => ['entrance', 'exit', 'walkway'].includes(p.type))
  },
  {
    id: 'facility',
    label: 'สิ่งอำนวยความสะดวก',
    icon: HelpCircle,
    color: '#0ea5e9',
    presets: ARCHITECTURE_PRESETS.filter(p => p.type === 'facility' || p.subType === 'restroom')
  },
  {
    id: 'structure',
    label: 'โครงสร้างหลัก',
    icon: Square,
    color: '#8b5cf6',
    presets: ARCHITECTURE_PRESETS.filter(p => p.type === 'restricted' && p.subType !== 'restroom')
  }
])



// Drag & Resize State
const isDragging = ref(false)
const isResizing = ref(false)
const isPanning = ref(false)
const dragType = ref('stall') // 'stall' | 'object'

const dragTarget = ref(null)
const startPos = ref({ x: 0, y: 0 })
const initialRect = ref({ x: 0, y: 0, w: 0, h: 0 })
const panStart = ref({ x: 0, y: 0 })

const selectedMetrics = computed(() => {
  return marketStore.getStallMetrics(marketStore.selectedStall)
})

const selectedObjectMetrics = computed(() => {
  return marketStore.getObjectMetrics(marketStore.selectedObject)
})

function getStallStatusClasses(stall) {
  if (stall.status === 'booked') {
    return 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 opacity-90 hover:border-slate-400'
  }
  if (stall.status === 'disabled') {
    return 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-400 border-slate-300 dark:border-slate-700 opacity-60'
  }
  // Available
  return 'bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:border-emerald-500 shadow-xs'
}

function getStatusLabel(status) {
  switch (status) {
    case 'available': return 'ว่าง'
    case 'booked': return 'จองแล้ว'
    case 'disabled': return 'ปิดบริการ'
    default: return status
  }
}

function getIconComponent(iconName) {
  switch (iconName) {
    case 'door-open': return DoorOpen
    case 'log-out': return LogOut
    case 'footprints': return Footprints
    case 'bath': return Bath
    case 'mic': return Mic
    case 'trash-2': return TrashIcon
    case 'credit-card': return CreditCard
    case 'help-circle': return HelpCircle
    case 'cross': return Cross
    default: return Square
  }
}

// Zoom controls
function zoomIn() {
  marketStore.zoomLevel = Math.min(2.0, marketStore.zoomLevel + 0.15)
}
function zoomOut() {
  marketStore.zoomLevel = Math.max(0.4, marketStore.zoomLevel - 0.15)
}
function resetZoom() {
  marketStore.zoomLevel = 1.0
  marketStore.panOffset = { x: 0, y: 0 }
}

// Touch Event Handlers
const touchStartDistance = ref(0)

function handleTouchStart(e) {
  activeDropdown.value = null
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    if (e.target === canvasContainer.value || e.target.classList.contains('bg-dot-pattern') || e.target.classList.contains('bg-dot-pattern-light')) {
      marketStore.deselectAll()
      isPanning.value = true
      panStart.value = { 
        x: touch.clientX - marketStore.panOffset.x, 
        y: touch.clientY - marketStore.panOffset.y 
      }
    }
  } else if (e.touches.length === 2) {
    isPanning.value = false
    const dx = e.touches[0].clientX - e.touches[1].clientX
    const dy = e.touches[0].clientY - e.touches[1].clientY
    touchStartDistance.value = Math.hypot(dx, dy)
  }
}

function handleTouchMove(e) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    if (isDragging.value && dragTarget.value) {
      const dx = (touch.clientX - startPos.value.x) / marketStore.zoomLevel
      const dy = (touch.clientY - startPos.value.y) / marketStore.zoomLevel
      if (dragType.value === 'stall') {
        marketStore.updateStallPosition(dragTarget.value.id, initialRect.value.x + dx, initialRect.value.y + dy)
      } else {
        marketStore.updateLayoutObjectPosition(dragTarget.value.id, initialRect.value.x + dx, initialRect.value.y + dy)
      }
    } else if (isResizing.value && dragTarget.value) {
      const dx = (touch.clientX - startPos.value.x) / marketStore.zoomLevel
      const dy = (touch.clientY - startPos.value.y) / marketStore.zoomLevel
      if (dragType.value === 'stall') {
        marketStore.updateStallSize(dragTarget.value.id, initialRect.value.w + dx, initialRect.value.h + dy)
      } else {
        marketStore.updateLayoutObjectSize(dragTarget.value.id, initialRect.value.w + dx, initialRect.value.h + dy)
      }
    } else if (isPanning.value) {
      marketStore.panOffset = {
        x: touch.clientX - panStart.value.x,
        y: touch.clientY - panStart.value.y
      }
    }
  } else if (e.touches.length === 2 && touchStartDistance.value > 0) {
    const dx = e.touches[0].clientX - e.touches[1].clientX
    const dy = e.touches[0].clientY - e.touches[1].clientY
    const dist = Math.hypot(dx, dy)
    const delta = (dist - touchStartDistance.value) * 0.005
    marketStore.zoomLevel = Math.min(2.5, Math.max(0.4, marketStore.zoomLevel + delta))
    touchStartDistance.value = dist
  }
}

// Drag & Resize Stall Handlers
function startTouchDragStall(e, stall) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    marketStore.snapshotStallIfNew(stall.id)
    isDragging.value = true
    dragType.value = 'stall'
    dragTarget.value = stall
    startPos.value = { x: touch.clientX, y: touch.clientY }
    initialRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
  }
}

function startTouchResizeStall(e, stall) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    marketStore.snapshotStallIfNew(stall.id)
    isResizing.value = true
    dragType.value = 'stall'
    dragTarget.value = stall
    startPos.value = { x: touch.clientX, y: touch.clientY }
    initialRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
  }
}

function startDragStall(e, stall) {
  if (e.button !== 0) return
  marketStore.snapshotStallIfNew(stall.id)
  isDragging.value = true
  dragType.value = 'stall'
  dragTarget.value = stall
  startPos.value = { x: e.clientX, y: e.clientY }
  initialRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
}

function startResizeStall(e, stall) {
  if (e.button !== 0) return
  marketStore.snapshotStallIfNew(stall.id)
  isResizing.value = true
  dragType.value = 'stall'
  dragTarget.value = stall
  startPos.value = { x: e.clientX, y: e.clientY }
  initialRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
}

// Drag & Resize Architecture Object Handlers
function startDragObject(e, obj) {
  if (e.button !== 0) return
  isDragging.value = true
  dragType.value = 'object'
  dragTarget.value = obj
  startPos.value = { x: e.clientX, y: e.clientY }
  initialRect.value = { x: obj.x, y: obj.y, w: obj.width, h: obj.height }
}

function startTouchDragObject(e, obj) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    isDragging.value = true
    dragType.value = 'object'
    dragTarget.value = obj
    startPos.value = { x: touch.clientX, y: touch.clientY }
    initialRect.value = { x: obj.x, y: obj.y, w: obj.width, h: obj.height }
  }
}

function startResizeObject(e, obj) {
  if (e.button !== 0) return
  isResizing.value = true
  dragType.value = 'object'
  dragTarget.value = obj
  startPos.value = { x: e.clientX, y: e.clientY }
  initialRect.value = { x: obj.x, y: obj.y, w: obj.width, h: obj.height }
}

function startTouchResizeObject(e, obj) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    isResizing.value = true
    dragType.value = 'object'
    dragTarget.value = obj
    startPos.value = { x: touch.clientX, y: touch.clientY }
    initialRect.value = { x: obj.x, y: obj.y, w: obj.width, h: obj.height }
  }
}

function handleCanvasMouseDown(e) {
  activeDropdown.value = null
  if (e.target === canvasContainer.value || e.target.classList.contains('bg-dot-pattern') || e.target.classList.contains('bg-dot-pattern-light')) {
    marketStore.deselectAll()
    isPanning.value = true
    panStart.value = { 
      x: e.clientX - marketStore.panOffset.x, 
      y: e.clientY - marketStore.panOffset.y 
    }
  }
}

function handleMouseMove(e) {
  if (isDragging.value && dragTarget.value) {
    const dx = (e.clientX - startPos.value.x) / marketStore.zoomLevel
    const dy = (e.clientY - startPos.value.y) / marketStore.zoomLevel
    const newX = initialRect.value.x + dx
    const newY = initialRect.value.y + dy

    if (dragType.value === 'stall') {
      marketStore.updateStallPosition(dragTarget.value.id, newX, newY)
    } else {
      marketStore.updateLayoutObjectPosition(dragTarget.value.id, newX, newY)
    }
  } else if (isResizing.value && dragTarget.value) {
    const dx = (e.clientX - startPos.value.x) / marketStore.zoomLevel
    const dy = (e.clientY - startPos.value.y) / marketStore.zoomLevel
    const newW = initialRect.value.w + dx
    const newH = initialRect.value.h + dy

    if (dragType.value === 'stall') {
      marketStore.updateStallSize(dragTarget.value.id, newW, newH)
    } else {
      marketStore.updateLayoutObjectSize(dragTarget.value.id, newW, newH)
    }
  } else if (isPanning.value) {
    marketStore.panOffset = {
      x: e.clientX - panStart.value.x,
      y: e.clientY - panStart.value.y
    }
  }
}

function handleMouseUp() {
  isDragging.value = false
  isResizing.value = false
  isPanning.value = false
  dragTarget.value = null
  touchStartDistance.value = 0
}
</script>

<style scoped>
/* Slide-down transition for category preset lists */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.18s ease;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-4px);
}
.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 400px;
  transform: translateY(0);
}
</style>
