export interface QOIModule extends EmscriptenWasm.Module {
  decode(data: BufferSource): ImageData | null
}

declare let moduleFactory: EmscriptenWasm.ModuleFactory<QOIModule>

export default moduleFactory
